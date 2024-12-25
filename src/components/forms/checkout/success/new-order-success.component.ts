import {ChangeDetectionStrategy, Component, inject, OnDestroy, Signal} from '@angular/core';
import {CheckoutFormService} from '../../../../services/checkout/checkout-form.service';
import {Button} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {CustomerDetailsComponent} from '../../../order/view/customer-details/customer-details.component';
import {AddressDetailsComponent} from '../../../order/view/address-details/address-details.component';
import {OrderDetailsComponent} from '../../../order/view/order-details/order-details.component';
import {AuthService} from '../../../../services/auth/auth.service';
import {CartService} from '../../../../services/cart/cart.service';
import {TranslatePipe} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';
import {CartComponent} from '../../../cart/sidebar/cart.component';

@Component({
  selector: 'app-new-order-success',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [
    Button,
    CustomerDetailsComponent,
    AddressDetailsComponent,
    OrderDetailsComponent,
    RouterLink,
    TranslatePipe,
    UpperCasePipe,
    CartComponent
  ],
  templateUrl: './new-order-success.component.html',
  styleUrl: './new-order-success.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewOrderSuccessComponent implements OnDestroy {
  protected checkoutFormService = inject(CheckoutFormService);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private router = inject(Router);
  isAuthenticated: Signal<boolean> = this.authService.getIsAuthenticated();

  goBack() {
    this.router.navigate(['/pizzas']);
  }

  ngOnDestroy(): void {
    this.cartService.clear();
  }
}
