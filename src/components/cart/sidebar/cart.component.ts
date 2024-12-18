import {ChangeDetectionStrategy, Component, inject, output, signal} from '@angular/core';
import {CartService} from '../../../services/cart/cart.service';
import {CartItemComponent} from '../cart-item/cart-item.component';
import {NavigationEnd, Router} from '@angular/router';
import {TotalsComponent} from '../totals/totals.component';
import {Button} from 'primeng/button';
import {filter} from 'rxjs';

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
  protected cartService: CartService = inject(CartService);
  private router = inject(Router);
  private viewOnlyRoutes = ["/order/new/", "/order/success", "/user/orders/"];
  items = this.cartService.cartItems;
  quantity = this.cartService.cartQuantity;
  total = this.cartService.cartTotal;
  totalAfterOffers = this.cartService.cartTotalAfterOffers;
  threeForTwoOffers = this.cartService.cartThreeForTwoOffers;
  secondForHalfPriceOffer = this.cartService.cartSecondHalfPriceOffer;
  viewOnly = signal(false);

  constructor() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      const isViewOnlyRoute = this.viewOnlyRoutes.findIndex(value => event.url.includes(value) || event.url === value);
      if (isViewOnlyRoute !== -1) {
        this.viewOnly.set(true);
      } else {
        this.viewOnly.set(false);
      }
    });
  }

  newOrderOnLick() {
    this.router.navigate(['order', 'new', 'step-one']);
    this.onNewOrderClick.emit(false); // hides de cart side panel
  }
}
