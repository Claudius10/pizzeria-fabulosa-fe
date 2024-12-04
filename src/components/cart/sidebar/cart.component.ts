import {ChangeDetectionStrategy, Component, inject, output} from '@angular/core';
import {CartService} from '../../../services/cart/cart.service';
import {CartItemComponent} from '../cart-item/cart-item.component';
import {Router} from '@angular/router';
import {OrderService} from '../../../services/http/order/order.service';
import {TotalsComponent} from '../totals/totals.component';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CartItemComponent,
    TotalsComponent,
    Button,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  onNewOrderClick = output<boolean>();
  private cartService: CartService = inject(CartService);
  private orderService: OrderService = inject(OrderService);
  private router = inject(Router);
  orderToUpdateId = this.orderService.getId();
  items = this.cartService.cartItems;
  quantity = this.cartService.cartQuantity;
  total = this.cartService.cartTotal;
  totalAfterOffers = this.cartService.cartTotalAfterOffers;
  threeForTwoOffers = this.cartService.cartThreeForTwoOffers;
  secondForHalfPriceOffer = this.cartService.cartSecondHalfPriceOffer;

  newOrderOnLick() {
    this.router.navigate(['new-order']);
    this.onNewOrderClick.emit(false);
  }
}
