import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CartService} from '../../../services/cart/cart.service';
import {CartItemComponent} from '../cart-item/cart-item.component';
import {TotalsComponent} from '../totals/totals.component';
import {CardModule} from 'primeng/card';

@Component({
  selector: 'app-cart-checkout',
  standalone: true,
  imports: [
    CartItemComponent,
    TotalsComponent,
    CardModule
  ],
  templateUrl: './checkout-cart.component.html',
  styleUrl: './checkout-cart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutCartComponent {
  private cartService: CartService = inject(CartService);
  items = this.cartService.cartItems;
  quantity = this.cartService.cartQuantity;
  total = this.cartService.cartTotal;
  totalAfterOffers = this.cartService.cartTotalAfterOffers;
  threeForTwoOffers = this.cartService.cartThreeForTwoOffers;
  secondForHalfPriceOffer = this.cartService.cartSecondHalfPriceOffer;
}
