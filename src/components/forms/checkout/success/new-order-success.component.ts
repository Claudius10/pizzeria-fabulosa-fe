import {ChangeDetectionStrategy, Component, inject, OnDestroy} from '@angular/core';
import {CheckoutFormService} from '../../../../services/forms/checkout/checkout-form.service';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';
import {CustomerDetailsComponent} from '../../../order/view/customer-details/customer-details.component';
import {AddressDetailsComponent} from '../../../order/view/address-details/address-details.component';
import {OrderDetailsComponent} from '../../../order/view/order-details/order-details.component';
import {CheckoutCartComponent} from '../cart/checkout-cart.component';

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
    CheckoutCartComponent
  ],
  templateUrl: './new-order-success.component.html',
  styleUrl: './new-order-success.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewOrderSuccessComponent implements OnDestroy {
  protected checkoutFormService = inject(CheckoutFormService);
  private cartService = inject(CheckoutFormService);
  private router = inject(Router);

  goBack() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.cartService.clear();
  }
}
