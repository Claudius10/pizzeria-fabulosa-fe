import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {AuthService} from '../../../services/auth/auth.service';
import {CustomerDTO} from '../../../interfaces/dto/order';

@Component({
  selector: 'app-user-details',
  imports: [
    TranslatePipe
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent {
  anon = input<CustomerDTO>();
  private authService = inject(AuthService);
  userName = this.authService.getUserName();
  userEmail = this.authService.getUserEmail();
  userContactNumber = this.authService.getUserContactNumber();
  isAuthenticated = this.authService.getIsAuthenticated();
}
