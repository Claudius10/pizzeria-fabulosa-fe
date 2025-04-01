import {ChangeDetectionStrategy, Component, inject, input, OnInit, output} from '@angular/core';
import {CartService} from '../../services/cart/cart.service';
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
  onNewOrderClick = output<boolean>();
  viewOnly = input.required<boolean>();
  inSidebar = input<boolean>(false);
  protected cartService = inject(CartService);
  private router = inject(Router);
  private viewOnlyRoute = false;

  ngOnInit(): void {
    const viewOnlyRoutes = getViewOnlyRoutes();
    for (let i = 0; i < viewOnlyRoutes.length; i++) {
      if (this.router.url.includes(viewOnlyRoutes[i])) {
        this.viewOnlyRoute = true;
        break;
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
}

const getViewOnlyRoutes = () => {
  return ["/order/new/", "/order/success", "/user/orders/"];
};
