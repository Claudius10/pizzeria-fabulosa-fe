import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CartService} from '../../services/cart/cart.service';
import {CartItemComponent} from './cart-item/cart-item.component';
import {RouterLink} from '@angular/router';
import {OrderService} from '../../services/http/order/order.service';
import {CartLocalstorageService} from '../../services/cart/localstorage/cart-localstorage.service';

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
export class CartComponent implements OnInit {
  private cartService: CartService = inject(CartService);
  private cartLocalStorageService = inject(CartLocalstorageService);
  private orderService: OrderService = inject(OrderService);
  orderToUpdateId = this.orderService.getId();
  items = this.cartService.cartItems;
  quantity = this.cartService.cartQuantity;
  total = this.cartService.cartTotal;
  totalAfterOffers = this.cartService.cartTotalAfterOffers;
  threeForTwoOffers = this.cartService.cartThreeForTwoOffers;
  secondForHalfPriceOffer = this.cartService.cartSecondHalfPriceOffer;

  ngOnInit(): void {
    if (!this.cartLocalStorageService.isEmpty()) {
      const {
        items,
        totalAfterOffers,
        total,
        quantity
      } = this.cartLocalStorageService.get();
      this.cartService.set(items, quantity, totalAfterOffers, total);
    }
  }
}
