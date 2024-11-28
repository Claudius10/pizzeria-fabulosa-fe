import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CartService} from '../../services/cart/cart.service';
import {CartItemComponent} from './cart-item/cart-item.component';
import {RouterLink} from '@angular/router';
import {OrderService} from '../../services/http/order/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CartItemComponent,
    RouterLink
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  private cartService: CartService = inject(CartService);
  private orderService: OrderService = inject(OrderService);
  orderToUpdateId = this.orderService.getId();
  items = this.cartService.cartItems;
  quantity = this.cartService.cartQuantity;
  total = this.cartService.cartTotal;
  totalAfterOffers = this.cartService.cartTotalAfterOffers;
  threeForTwoOffers = this.cartService.cartThreeForTwoOffers;
  secondForHalfPriceOffer = this.cartService.cartSecondHalfPriceOffer;
}
