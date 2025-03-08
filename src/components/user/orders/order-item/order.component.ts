import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CartService} from '../../../../services/cart/cart.service';
import {OrderService} from '../../../../services/http/order/order.service';
import {userOrderQueryKey} from '../../../../utils/query-keys';
import {ERROR, PENDING, SUCCESS} from '../../../../utils/constants';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {QueryResult} from '../../../../interfaces/query';
import {AddressDetailsComponent} from './address-details/address-details.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {CartDTO} from '../../../../interfaces/dto/order';
import {Card} from 'primeng/card';
import {toObservable} from '@angular/core/rxjs-interop';
import {LoadingAnimationService} from '../../../../services/animation/loading-animation.service';
import {MutationResult} from '../../../../interfaces/mutation';
import {CartComponent} from '../../../cart/cart.component';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ServerErrorComponent} from '../../../../app/routes/error/server-no-response/server-error.component';
import {UpperCasePipe} from '@angular/common';
import {ErrorService} from '../../../../services/error/error.service';
import {ResponseDTO} from '../../../../interfaces/http/api';
import {isDst} from '../../../../utils/functions';
import {Button} from 'primeng/button';
import {UserDetailsComponent} from '../../details/user-details.component';

@Component({
  selector: 'app-order',
  imports: [
    ServerErrorComponent,
    Card,
    TranslatePipe,
    RouterLink,
    UserDetailsComponent,
    AddressDetailsComponent,
    OrderDetailsComponent,
    CartComponent,
    Button,
    UpperCasePipe,
    ConfirmDialog
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent implements OnInit {
  private loadingAnimationService = inject(LoadingAnimationService);
  private confirmationService = inject(ConfirmationService);
  private translateService = inject(TranslateService);
  private activatedRoute = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private errorService = inject(ErrorService);
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  orderId = this.activatedRoute.snapshot.paramMap.get("orderId") === null ? "0" : this.activatedRoute.snapshot.paramMap.get("orderId")!;
  order: QueryResult = this.orderService.findUserOrder({
    id: this.orderId,
    userId: this.authService.userId,
    queryKey: userOrderQueryKey(this.orderId)
  });
  orderStatus = toObservable(this.order.status);
  delete: MutationResult = this.orderService.deleteUserOrder();

  ngOnInit(): void {
    const subscription = this.orderStatus.subscribe({
      next: status => {
        if (status === PENDING) {
          this.loadingAnimationService.startLoading();
        }

        if (status === ERROR) {
          this.loadingAnimationService.stopLoading();
        }

        if (status === SUCCESS && this.order.status() === SUCCESS) {
          this.loadingAnimationService.stopLoading();

          const orderResponse: ResponseDTO = this.order.data()!;

          if (orderResponse.status.error && orderResponse.error) {
            this.errorService.handleError(orderResponse.error);
          } else {
            const cart = this.order.data()!.payload.cart as CartDTO;
            this.cartService.set(cart.cartItems, cart.totalQuantity, cart.totalCost);
          }
        }
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      this.cartService.clear();
      this.loadingAnimationService.stopLoading();
    });
  }

  beginDelete(event: Event) {
    const isDeleteAllowed = isOrderMutationAllowed(this.order.data()!.payload.createdOn, 10);

    if (isDeleteAllowed) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        header: this.translateService.instant("toast.order.cancel.confirm.header"),
        message: this.translateService.instant("toast.order.cancel.confirm.message"),
        icon: 'pi pi-exclamation-triangle',
        closable: true,
        closeOnEscape: true,
        rejectButtonProps: {
          severity: "danger",
        },
        acceptButtonProps: {
          severity: 'success',
        },
        accept: () => {
          // if user accepts, send DELETE request for order

          this.loadingAnimationService.startLoading();

          this.delete.mutate({
              payload: {
                userId: this.authService.userId,
                orderId: this.order.data()!.payload.id
              }
            },
            {
              onSuccess: (response: ResponseDTO) => {
                if (response.status.error && response.error) {
                  this.errorService.handleError(response.error);

                } else {
                  // trigger toast
                  this.messageService.add({
                    severity: 'success',
                    summary: this.translateService.instant("toast.severity.info"),
                    detail: this.translateService.instant("toast.order.cancel.order.cancelled"),
                    life: 2000
                  });

                  // nav to order summary list after two seconds
                  setTimeout(() => {
                    this.router.navigate(["user", "orders"]);
                  }, 2000);

                }
              },
              onError: () => {
                this.errorService.handleServerNoResponse();
              },
              onSettled: () => {
                this.loadingAnimationService.stopLoading();
              }
            });
        },
        // if user rejects
        reject: () => {
          // nothing
        }
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: this.translateService.instant("toast.severity.warning"),
        detail: this.translateService.instant("toast.order.cancel.not.allowed.message"),
        life: 3000
      });
    }
  }
}

const isOrderMutationAllowed = (orderCreatedOn: string, timeLimit: number) => {
  const now = new Date(Date.now());
  const createdOn = new Date(orderCreatedOn);  // createdOn is in UTC+0 in DB
  const dst = isDst(createdOn);

  // is Daylight Saving Time (DST) ?
  if (!dst) {
    createdOn.setTime(createdOn.getTime() + 3600000); // add one hour
  } else {
    createdOn.setTime(createdOn.getTime() + 7200000); // add two hours
  }

  const limit = new Date(createdOn.getTime() + (timeLimit * 60000)); // timeLimit in minutes, so timeLimit * (1min in ms) to convert it to ms
  return now < limit;
};
