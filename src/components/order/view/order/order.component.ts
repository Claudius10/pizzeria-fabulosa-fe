import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CartService} from '../../../../services/cart/cart.service';
import {OrderService} from '../../../../services/http/order/order.service';
import {userOrderQueryKey} from '../../../../utils/query-keys';
import {PENDING, SUCCESS} from '../../../../utils/constants';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {QueryResult} from '../../../../interfaces/query';
import {AddressDetailsComponent} from '../address-details/address-details.component';
import {CustomerDetailsComponent} from '../customer-details/customer-details.component';
import {OrderDetailsComponent} from '../order-details/order-details.component';
import {CartDTO, CustomerDTO} from '../../../../interfaces/dto/order';
import {CheckoutCartComponent} from '../../../forms/checkout/cart/checkout-cart.component';
import {CardModule} from 'primeng/card';
import {toObservable} from '@angular/core/rxjs-interop';
import {ResponseDTO} from '../../../../interfaces/http/api';
import {LoadingAnimationService} from '../../../../services/navigation/loading-animation.service';
import {MutationResult} from '../../../../interfaces/mutation';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    ToastModule,
    OrderDetailsComponent,
    ConfirmDialogModule,
    AddressDetailsComponent,
    CustomerDetailsComponent,
    OrderDetailsComponent,
    CheckoutCartComponent,
    CardModule,
    RouterLink
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent implements OnInit {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private activatedRoute = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private loadingAnimationService = inject(LoadingAnimationService);
  private confirmationService = inject(ConfirmationService);
  orderId = this.activatedRoute.snapshot.paramMap.get("orderId") === null ? "0" : this.activatedRoute.snapshot.paramMap.get("orderId")!;
  order: QueryResult = this.orderService.findUserOrder({
    orderId: this.orderId,
    userId: this.authService.getUserId(),
    queryKey: userOrderQueryKey(this.orderId)
  });
  orderStatus = toObservable(this.order.status);
  delete: MutationResult = this.orderService.deleteUserOrder();
  customer: CustomerDTO = {
    name: this.authService.getUserName()!,
    email: this.authService.getUserEmail()!,
    contactNumber: Number(this.authService.getUserContactNumber()!)
  };

  ngOnInit(): void {
    const subscription = this.orderStatus.subscribe({
      next: status => {

        if (status === PENDING) {
          this.loadingAnimationService.startLoading();
        }

        if (status === SUCCESS) {
          this.loadingAnimationService.stopLoading();
          const cart = this.order.data()!.payload.cart as CartDTO;
          this.cartService.set(cart.cartItems, cart.totalQuantity, cart.totalCost);
        }
      }, complete: () => {
        this.loadingAnimationService.stopLoading();
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
        message: '¿Desea cancelar el pedido?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
          // if user accepts, send delete
          this.loadingAnimationService.startLoading();
          this.delete.mutate({
            payload: {
              userId: this.authService.getUserId(),
              orderId: this.order.data()!.payload.id
            }
          }, {
            onSuccess: (response: ResponseDTO) => {
              // trigger toast
              this.messageService.add({
                severity: 'info',
                summary: 'Confirmado',
                detail: `Pedido ${response.payload} eliminado. Redirigiendo en 2 segundos...`,
                life: 2000
              });
              // nav to order summary list after two seconds
              setTimeout(() => {
                this.router.navigate(["user", "orders"]).catch(reason => {
                  // handle nav error
                });
              }, 2000);
            },
            onError: () => {
              // trigger toast
              this.messageService.add({
                severity: 'info',
                summary: 'Error',
                detail: `Error al eliminar el pedido`,
                life: 2000
              });
            },
            onSettled: () => {
              this.loadingAnimationService.stopLoading();
            }
          });
        },
        // if user rejects
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Cancelado',
            detail: 'Eliminación cancelada',
            life: 2000
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Política de actualización',
        detail: 'EL pedido no se puede modificar transcurrido 10 minutos'
      });
    }
  }
}

const isOrderMutationAllowed = (orderCreatedOn: string, timeLimit: number) => {
  const now = new Date(Date.now());
  const createdOn = new Date(orderCreatedOn);

  // add one hour to createdOn because DB is in UTC+0 (3600000 ms), add two hours when there's summertime in EU (7200000 ms)
  createdOn.setTime(createdOn.getTime() + 3600000);

  const limit = new Date(createdOn.getTime() + (timeLimit * 60000)); // timeLimit in minutes, so timeLimit * (1min in ms) to convert it to ms

  return now < limit;
};
