import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {CheckoutFormComponent} from '../forms/checkout/CheckoutForm/checkout-form.component';
import {UserCheckoutFormComponent} from '../forms/checkout/UserCheckoutForm/user-checkout-form.component';

@Component({
  selector: 'app-checkout',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [
    CheckoutFormComponent,
    UserCheckoutFormComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent {
  private authService = inject(AuthService);
  isUserAuthenticated = this.authService.getIsAuthenticated();
}
