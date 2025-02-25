import {ChangeDetectionStrategy, Component, inject, input, OnInit, output, signal} from '@angular/core';
import {CartService} from '../../../services/cart/cart.service';
import {CartItemComponent} from '../cart-item/cart-item.component';
import {Router} from '@angular/router';
import {TotalsComponent} from '../totals/totals.component';
import {Button} from 'primeng/button';
import {TranslatePipe} from '@ngx-translate/core';
import {NgClass, UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [
    NgClass,
    CartItemComponent,
    TotalsComponent,
    Button,
    TranslatePipe,
    UpperCasePipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  onNewOrderClick = output<boolean>();
  protected cartService: CartService = inject(CartService);
  private router = inject(Router);
  private viewOnlyRoutes = ["/order/new/", "/order/success", "/user/orders/"];
  viewOnly = input.required<boolean>();
  inSidebar = input<boolean>(false);
  items = this.cartService.cartItems;
  quantity = this.cartService.cartQuantity;
  total = this.cartService.cartTotal;
  totalAfterOffers = this.cartService.cartTotalAfterOffers;
  threeForTwoOffers = this.cartService.cartThreeForTwoOffers;
  secondForHalfPriceOffer = this.cartService.cartSecondHalfPriceOffer;
  viewOnlyRoute = signal(false);

  ngOnInit(): void {
    for (let i = 0; i < this.viewOnlyRoutes.length; i++) {
      if (this.router.url.includes(this.viewOnlyRoutes[i])) {
        this.viewOnlyRoute.set(true);
        break;
      }
    }
  }

  getIsViewOnly() {
    return this.viewOnly() || this.viewOnlyRoute();
  }

  newOrderOnLick() {
    this.router.navigate(['order', 'new', 'step-one']);
    this.onNewOrderClick.emit(false); // hides de cart side panel
  }
}
