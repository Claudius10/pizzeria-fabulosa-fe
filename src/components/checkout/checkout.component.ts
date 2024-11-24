import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {AnonUserCheckoutFormComponent} from '../forms/checkout/AnonUserCheckoutForm/anon-user-checkout-form.component';
import {UserCheckoutFormComponent} from '../forms/checkout/UserCheckoutForm/user-checkout-form.component';

@Component({
  selector: 'app-checkout',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [
    AnonUserCheckoutFormComponent,
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
