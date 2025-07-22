import {ChangeDetectionStrategy, Component, inject, input, OnInit, output} from '@angular/core';
import {CartService} from '../services/cart/cart.service';
import {CartItemComponent} from './cart-item/cart-item.component';
import {Router} from '@angular/router';
import {TotalsComponent} from './totals/totals.component';
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
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  private readonly cartQuantity = this.cartService.getQuantity();
  private readonly cartItems = this.cartService.getItems();
  private readonly cartTotal = this.cartService.getTotal();
  private readonly cartTotalAfterOffers = this.cartService.getTotalAfterOffers();
  private readonly secondHalPriceOffer = this.cartService.getSecondHalfPriceOffer();
  private readonly threeForTwoOffer = this.cartService.getThreeForTwoOffers();
  readonly viewOnly = input.required<boolean>();
  readonly inSidebar = input<boolean>(false);
  readonly onNewOrderClick = output<boolean>();
  private viewOnlyRoute = false;

  ngOnInit(): void {
    const viewOnlyRoutes = ["/order/new/", "/order/success", "/user/orders/"];
    for (let i = 0; i < viewOnlyRoutes.length; i++) {
      if (this.router.url.includes(viewOnlyRoutes[i])) {
        this.viewOnlyRoute = true;
        break; // this break does not work lmao
      }
    }
  }

  // in view only mode, cart item quantity cannot be changed
  getIsViewOnly() {
    return this.viewOnly() || this.viewOnlyRoute;
  }

  toCheckout() {
    this.router.navigate(['order', 'new', 'step-one']);
    this.onNewOrderClick.emit(false); // hides de cart side panel
  }

  getTotal() {
    return this.cartTotal();
  }

  getTotalAfterOffers() {
    return this.cartTotalAfterOffers();
  }

  getSecondHalfPriceOffer() {
    return this.secondHalPriceOffer();
  }

  getThreeForTwoOffer() {
    return this.threeForTwoOffer();
  }

  getItems() {
    return this.cartItems();
  }

  getQuantity() {
    return this.cartQuantity();
  }
}
