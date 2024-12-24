import {ChangeDetectionStrategy, Component, inject, OnDestroy, Signal} from '@angular/core';
import {CheckoutFormService} from '../../../../services/checkout/checkout-form.service';
import {Button} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {CustomerDetailsComponent} from '../../../order/view/customer-details/customer-details.component';
import {AddressDetailsComponent} from '../../../order/view/address-details/address-details.component';
import {OrderDetailsComponent} from '../../../order/view/order-details/order-details.component';
import {CheckoutCartComponent} from '../cart/checkout-cart.component';
import {AuthService} from '../../../../services/auth/auth.service';
import {CartService} from '../../../../services/cart/cart.service';
import {TranslatePipe} from '@ngx-translate/core';

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
    CheckoutCartComponent,
    RouterLink,
    TranslatePipe
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
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.cartService.clear();
  }
}
