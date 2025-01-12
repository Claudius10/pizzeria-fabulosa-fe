import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CartService} from '../../../../services/cart/cart.service';
import {OrderService} from '../../../../services/http/order/order.service';
import {RESOURCE_PRODUCT_ALL, userOrderQueryKey} from '../../../../utils/query-keys';
import {ERROR, PENDING, SUCCESS} from '../../../../utils/constants';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {QueryResult} from '../../../../interfaces/query';
import {AddressDetailsComponent} from './address-details/address-details.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {CartDTO, CustomerDTO} from '../../../../interfaces/dto/order';
import {CardModule} from 'primeng/card';
import {toObservable} from '@angular/core/rxjs-interop';
import {LoadingAnimationService} from '../../../../services/navigation/loading-animation.service';
import {MutationResult} from '../../../../interfaces/mutation';
import {ResourceService} from '../../../../services/http/resources/resource.service';
import {CartComponent} from '../../../cart/sidebar/cart.component';
import {merge} from 'rxjs';
import {ProductDTO} from '../../../../interfaces/dto/resources';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ServerErrorComponent} from '../../../app/error/server-no-response/server-error.component';
import {UpperCasePipe} from '@angular/common';
import {ErrorService} from '../../../../services/error/error.service';
import {ResponseDTO} from '../../../../interfaces/http/api';
import {isDst} from '../../../../utils/functions';
import {Button} from 'primeng/button';
import {UserDetailsComponent} from '../../details/user-details.component';

@Component({
  selector: 'app-order',
  imports: [
    CardModule,
    TranslatePipe,
    RouterLink,
    AddressDetailsComponent,
    OrderDetailsComponent,
    CartComponent,
    Button,
    UpperCasePipe,
    ConfirmDialogModule,
    ServerErrorComponent,
    UserDetailsComponent
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent implements OnInit {
  private router = inject(Router);
  private translateService = inject(TranslateService);
  private errorService = inject(ErrorService);
  private destroyRef = inject(DestroyRef);
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private resourceService = inject(ResourceService);
  private activatedRoute = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private loadingAnimationService = inject(LoadingAnimationService);
  private confirmationService = inject(ConfirmationService);
  userName = this.authService.getUserName();
  userEmail = this.authService.getUserEmail();
  userContactNumber = this.authService.getUserContactNumber();
  orderId = this.activatedRoute.snapshot.paramMap.get("orderId") === null ? "0" : this.activatedRoute.snapshot.paramMap.get("orderId")!;
  allProducts = this.resourceService.findAllProducts({queryKey: RESOURCE_PRODUCT_ALL});
  order: QueryResult = this.orderService.findUserOrder({
    id: this.orderId,
    userId: this.authService.getUserId()!,
    queryKey: userOrderQueryKey(this.orderId)
  });
  allProductsStatus = toObservable(this.allProducts.status);
  orderStatus = toObservable(this.order.status);
  status = merge(this.allProductsStatus, this.orderStatus);
  delete: MutationResult = this.orderService.deleteUserOrder();
  customer: CustomerDTO = {
    name: this.userName()!,
    email: this.userEmail()!,
    contactNumber: Number(this.userContactNumber()!)
  };

  ngOnInit(): void {
    const subscription = this.status.subscribe({
      next: status => {
        if (status === PENDING) {
          this.loadingAnimationService.startLoading();
        }

        if (status === ERROR) {
          this.loadingAnimationService.stopLoading();
        }

        if (status === SUCCESS && this.order.status() === SUCCESS && this.allProducts.status() === SUCCESS) {
          this.loadingAnimationService.stopLoading();

          const orderResponse: ResponseDTO = this.order.data()!;
          const productsResponse: ResponseDTO = this.allProducts.data()!;

          if (orderResponse.status.error || productsResponse.status.error) {
            if (orderResponse.status.error) {
              this.errorService.handleError(orderResponse);
              return;
            }

            if (productsResponse.status.error) {
              this.errorService.handleError(productsResponse);
            }
          } else {
            const cart = this.order.data()!.payload.cart as CartDTO;
            const allProducts = this.allProducts.data()!.payload as ProductDTO[];
            this.cartService.set(cart.cartItems, cart.totalQuantity, cart.totalCost, true, allProducts);
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
          // if user accepts, send account-delete
          this.loadingAnimationService.startLoading();
          this.delete.mutate({
            payload: {
              userId: this.authService.getUserId(),
              orderId: this.order.data()!.payload.id
            }
          }, {
            onSuccess: (response: ResponseDTO) => {
              if (response.status.error) {
                this.errorService.handleError(response);
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
