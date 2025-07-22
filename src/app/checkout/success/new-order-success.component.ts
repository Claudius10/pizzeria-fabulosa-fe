import {afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import {CheckoutFormService} from '../../services/checkout/checkout-form.service';
import {Button} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {CartService} from '../../services/cart/cart.service';
import {TranslatePipe} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';
import {CartComponent} from '../../cart/cart.component';
import {OrderAddressDetailsComponent} from '../../user/orders/order-item/address-details/order-address-details.component';
import {OrderDetailsComponent} from '../../user/orders/order-item/order-details/order-details.component';
import {Card} from "primeng/card";
import {UserDetailsComponent} from "../../user/details/user-details.component";
import {MyCartItemDTO} from '../../../utils/interfaces/MyCartItemDTO';

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
export class NewOrderSuccessComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly checkoutFormService = inject(CheckoutFormService);
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  protected readonly authState = this.authService.getIsAuthenticated();
  protected readonly orderSuccess = this.checkoutFormService.getOrderSuccess();

  constructor() {
    afterNextRender(() => {
      if (this.orderSuccess()) {
        const cart = this.orderSuccess()!.cart!;
        const cartItems = cart.cartItems as MyCartItemDTO[];
        this.cartService.set(cartItems, cart.totalQuantity, cart.totalCost);
      }

      this.destroyRef.onDestroy(() => {
        this.cartService.clear();
        this.checkoutFormService.clear();
      });
    });
  }

  protected goBack() {
    this.router.navigate(['/pizzas']);
  }
}
