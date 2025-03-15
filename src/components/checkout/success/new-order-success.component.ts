import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CheckoutFormService} from '../../../services/checkout/checkout-form.service';
import {Button} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {CartService} from '../../../services/cart/cart.service';
import {TranslatePipe} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';
import {CartComponent} from '../../cart/cart.component';
import {
  OrderAddressDetailsComponent
} from '../../user/orders/order-item/address-details/order-address-details.component';
import {OrderDetailsComponent} from '../../user/orders/order-item/order-details/order-details.component';
import {Card} from "primeng/card";
import {UserDetailsComponent} from "../../user/details/user-details.component";

@Component({
  selector: 'app-new-order-success',
  host: {
    class: 'upper-layout',
  },
  imports: [
    TranslatePipe,
    UpperCasePipe,
    Button,
    Card,
    UserDetailsComponent,
    OrderAddressDetailsComponent,
    OrderDetailsComponent,
    CartComponent,
    RouterLink
  ],
  templateUrl: './new-order-success.component.html',
  styleUrl: './new-order-success.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewOrderSuccessComponent implements OnInit {
  protected checkoutFormService = inject(CheckoutFormService);
  protected authService = inject(AuthService);
  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  goBack() {
    this.router.navigate(['/pizzas']);
  }

  ngOnInit(): void {
    if (this.checkoutFormService.orderSuccess) {
      const cart = this.checkoutFormService.orderSuccess.cart!;
      this.cartService.set(cart.cartItems, cart.totalQuantity, cart.totalCost);
    }

    this.destroyRef.onDestroy(() => {
      this.cartService.clear();
      this.checkoutFormService.clear();
    });
  }
}
