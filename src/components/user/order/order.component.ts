import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {CartComponent} from '../../cart/cart.component';
import {CartService} from '../../../services/cart/cart.service';
import {UserCheckoutFormComponent} from '../../forms/checkout/UserCheckoutForm/user-checkout-form.component';
import {OrderService} from '../../../services/order/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    AsyncPipe,
    CartComponent,
    UserCheckoutFormComponent
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent {
  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  order = this.orderService.getOrder();
  isUpdatingOrder = signal(false);

  constructor() {
    const orderId = this.activatedRoute.snapshot.paramMap.get("orderId");
    if (orderId !== null) {
      if (this.order().id === 0 || this.order().id !== Number(orderId)) {

        const subscription = this.orderService.findUserOrder(this.authService.getUserId(), orderId).subscribe({
          next: order => {
            this.orderService.setOrder(order);
          }
        });

        // stop request if component is destroyed early
        this.destroyRef.onDestroy(() => {
          subscription.unsubscribe();
        });
      }
    }
  }

  startUpdate() {
    const cart = this.order().cart;
    this.cartService.setOrderCart(cart.cartItems, cart.totalQuantity, cart.totalCost, cart.totalCostOffers);
    this.isUpdatingOrder.set(true);
  }

  finishUpdate() {
    this.isUpdatingOrder.set(false);
  }
}
