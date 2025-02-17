import {ChangeDetectionStrategy, Component, inject, input, OnInit, output, signal} from '@angular/core';
import {CartService} from '../../../services/cart/cart.service';
import {CartItemComponent} from '../cart-item/cart-item.component';
import {NavigationEnd, Router} from '@angular/router';
import {TotalsComponent} from '../totals/totals.component';
import {Button} from 'primeng/button';
import {filter} from 'rxjs';
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
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      const url = event.url;
      const isViewOnlyRoute = this.viewOnlyRoutes.findIndex(route => url.includes(route) || url === route);
      if (isViewOnlyRoute !== -1) {
        this.viewOnlyRoute.set(true);
      } else {
        this.viewOnlyRoute.set(false);
      }
    });
  }

  getIsViewOnly() {
    return this.viewOnly() || this.viewOnlyRoute();
  }

  newOrderOnLick() {
    this.router.navigate(['order', 'new', 'step-one']);
    this.onNewOrderClick.emit(false); // hides de cart side panel
  }
}
