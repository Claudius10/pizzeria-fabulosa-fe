import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CartService} from '../../../../services/cart/cart.service';
import {TotalsComponent} from '../../../cart/totals/totals.component';
import {CardModule} from 'primeng/card';
import {CartItemComponent} from '../../../cart/cart-item/cart-item.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-cart-checkout',
  standalone: true,
  imports: [
    TotalsComponent,
    CardModule,
    CartItemComponent,
    TranslatePipe
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
