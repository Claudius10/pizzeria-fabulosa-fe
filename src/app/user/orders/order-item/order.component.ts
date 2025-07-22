import {afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, inject, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CartService} from '../../../services/cart/cart.service';
import {ERROR, PENDING, SUCCESS} from '../../../../utils/constants';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {OrderAddressDetailsComponent} from './address-details/order-address-details.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {Card} from 'primeng/card';
import {toObservable} from '@angular/core/rxjs-interop';
import {LoadingAnimationService} from '../../../services/animation/loading-animation.service';
import {CartComponent} from '../../../cart/cart.component';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ServerErrorComponent} from '../../../routes/error/server-no-response/server-error.component';
import {isPlatformBrowser, UpperCasePipe} from '@angular/common';
import {ErrorService} from '../../../services/error/error.service';
import {Button} from 'primeng/button';
import {UserDetailsComponent} from '../../details/user-details.component';
import {Skeleton} from 'primeng/skeleton';
import {injectMutation, injectQuery, QueryClient} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {USER_ORDER_SUMMARY_LIST} from '../../../../utils/query-keys';
import {tempQueryResult, tempStatus$} from '../../../../utils/placeholder';
import {AuthService} from '../../../services/auth/auth.service';
import {MyCartItemDTO} from '../../../../utils/interfaces/MyCartItemDTO';
import {QueryResult} from '../../../../utils/interfaces/query';
import {OrderDTO, UserOrdersAPIService} from '../../../../api/business';

@Component({
  selector: 'app-order',
  imports: [
    ServerErrorComponent,
    Card,
    TranslatePipe,
    RouterLink,
    UserDetailsComponent,
    OrderAddressDetailsComponent,
    OrderDetailsComponent,
    CartComponent,
    Button,
    UpperCasePipe,
    ConfirmDialog,
    Skeleton
  ],
  providers: [ConfirmationService],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent {
  private platformId = inject(PLATFORM_ID);
  private isServer = !isPlatformBrowser(this.platformId);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private errorService = inject(ErrorService);
  private queryClient = inject(QueryClient);
  private confirmationService = inject(ConfirmationService);
  private loadingAnimationService = inject(LoadingAnimationService);
  private translateService = inject(TranslateService);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  private userId = this.authService.getId();
  private cartService = inject(CartService);
  private activatedRoute = inject(ActivatedRoute);
  protected orderId = this.activatedRoute.snapshot.paramMap.get("orderId") === null ? 0 : Number(this.activatedRoute.snapshot.paramMap.get("orderId")!);
  private userOrdersAPI = inject(UserOrdersAPIService);

  protected order: QueryResult<OrderDTO | undefined> = !this.isServer ? injectQuery(() => ({
    queryKey: ["user", "order", this.orderId.toString()],
    queryFn: () => lastValueFrom(this.userOrdersAPI.findById(this.orderId))
  })) : tempQueryResult();


  private orderStatus = !this.isServer ? toObservable(this.order.status) : tempStatus$();

  private delete = injectMutation(() => ({
    mutationFn: (data: { orderId: number, userId: number }) => lastValueFrom(this.userOrdersAPI.deleteById(data.orderId)),
    onSuccess: () => {
      this.queryClient.refetchQueries({queryKey: USER_ORDER_SUMMARY_LIST});
    }
  }));

  constructor() {
    afterNextRender(() => {

      const subscription = this.orderStatus.subscribe({
        next: status => {
          if (status === PENDING) {
            this.loadingAnimationService.startLoading();
          }

          if (status === ERROR) {
            this.loadingAnimationService.stopLoading();
            this.errorService.handleError(this.order.error()!);
          }

          if (status === SUCCESS && this.order.status() === SUCCESS) {
            this.loadingAnimationService.stopLoading();

            if (this.order.data()! !== null) {
              const cart = this.order.data()!.cart;
              const cartItems = cart.cartItems as MyCartItemDTO[];
              this.cartService.set(cartItems, cart.totalQuantity, cart.totalCost);
            }
          }
        }
      });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
        this.cartService.clear();
        this.loadingAnimationService.stopLoading();
      });
    });
  }

  protected beginDelete(event: Event) {
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

        this.delete.mutate({orderId: this.orderId, userId: this.userId()!},
          {
            onSuccess: (response: number) => {
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
            },
            onError: (error) => {
              this.errorService.handleError(error);
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
  }
}
