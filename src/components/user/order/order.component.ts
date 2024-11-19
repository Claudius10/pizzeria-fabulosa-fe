import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../../../services/cart/cart.service';
import {UserCheckoutFormComponent} from '../../forms/checkout/UserCheckoutForm/user-checkout-form.component';
import {OrderService} from '../../../services/order/order.service';
import {UserAddressItemComponent} from '../user-address-item/user-address-item.component';
import {UserDetailsComponent} from '../user-details/user-details.component';
import {OrderDetailsComponent} from '../order-details/order-details.component';
import {userOrderQueryKey} from '../../../interfaces/query-keys';
import {ERROR, PENDING, SUCCESS} from '../../../utils/constants';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    ToastModule,
    UserCheckoutFormComponent,
    UserAddressItemComponent,
    UserDetailsComponent,
    OrderDetailsComponent
  ],
  providers: [MessageService],
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
  orderId = this.activatedRoute.snapshot.paramMap.get("orderId") === null ? "0" : this.activatedRoute.snapshot.paramMap.get("orderId")!;
  order = this.orderService.findUserOrder({
    orderId: this.orderId,
    userId: this.authService.getUserId(),
    queryKey: userOrderQueryKey(this.orderId)
  });
  orderToUpdateId = this.orderService.getOrderToUpdateId();
  userName = this.authService.getUserName();
  userEmail = this.authService.getUserEmail();
  userContactNumber = this.authService.getUserContactNumber();

  beginUpdate() {
    const isUpdateAllowed = isOrderMutationAllowed(this.order.data()!.createdOn, 10);
    if (isUpdateAllowed) {
      const cart = this.order.data()!.cart;
      this.orderService.setOrderToUpdateId(this.order.data()!.id.toString());
      this.cartService.setOrderCart(cart.cartItems, cart.totalQuantity, cart.totalCost, cart.totalCostOffers);
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El tiempo limite para modificar el pedido ha terminado'
      });
    }
  }

  cancelUpdate() {
    this.orderService.setOrderToUpdateId(null);
  }

  beginDelete() {

  }

  confirmDelete() {

  }

  cancelDelete() {

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
