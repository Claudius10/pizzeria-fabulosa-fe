import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../../../services/cart/cart.service';
import {UserCheckoutFormComponent} from '../../forms/checkout/UserCheckoutForm/user-checkout-form.component';
import {OrderService} from '../../../services/http/order/order.service';
import {UserAddressItemComponent} from '../../user/user-address-item/user-address-item.component';
import {UserDetailsComponent} from '../../user/user-details/user-details.component';
import {OrderDetailsComponent} from '../../user/order-summary-details/order-details.component';
import {userOrderQueryKey} from '../../../utils/query-keys';
import {ERROR, PENDING, SUCCESS} from '../../../utils/constants';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    ToastModule,
    UserCheckoutFormComponent,
    UserAddressItemComponent,
    UserDetailsComponent,
    OrderDetailsComponent,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent {
  protected readonly PENDING = PENDING;
  protected readonly ERROR = ERROR;
  protected readonly SUCCESS = SUCCESS;
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private activatedRoute = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  orderId = this.activatedRoute.snapshot.paramMap.get("orderId") === null ? "0" : this.activatedRoute.snapshot.paramMap.get("orderId")!;
  order = this.orderService.findUserOrder({
    orderId: this.orderId,
    userId: this.authService.getUserId(),
    queryKey: userOrderQueryKey(this.orderId)
  });
  delete = this.orderService.deleteUserOrder();
  orderToUpdateId = this.orderService.getId();
  userName = this.authService.getUserName();
  userEmail = this.authService.getUserEmail();
  userContactNumber = this.authService.getUserContactNumber();

  beginUpdate() {
    const isUpdateAllowed = isOrderMutationAllowed(this.order.data()!.payload.createdOn, 10);
    if (isUpdateAllowed) {
      const cart = this.order.data()!.payload.cart;
      this.orderService.setId(this.order.data()!.payload.id.toString());
      this.cartService.set(cart.cartItems, cart.totalQuantity, cart.totalCost);
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Política de actualización',
        detail: 'EL pedido no se puede modificar transcurrido 10 minutos'
      });
    }
  }

  cancelUpdate() {
    this.orderService.setId(null);
    this.cartService.clear();
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
          this.delete.mutate({userId: this.authService.getUserId(), orderId: this.order.data()!.payload.id}, {
            onSuccess: (orderId) => {
              // trigger toast
              this.messageService.add({
                severity: 'info',
                summary: 'Confirmado',
                detail: `Pedido ${orderId} eliminado. Redirigiendo en 2 segundos...`,
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
