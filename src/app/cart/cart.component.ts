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
  protected readonly quantity = this.cartService.getQuantity();
  protected readonly items = this.cartService.getItems();
  protected readonly total = this.cartService.getTotal();
  protected readonly totalAfterOffers = this.cartService.getTotalAfterOffers();
  protected readonly secondHalPriceOffer = this.cartService.getSecondHalfPriceOffer();
  protected readonly threeForTwoOffer = this.cartService.getThreeForTwoOffers();
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
    this.onNewOrderClick.emit(false); // hides de cart side panel
    this.router.navigate(['order', 'new', 'step-one']);
  }
}
