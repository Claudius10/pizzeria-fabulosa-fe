import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {AuthService} from '../../services/auth/auth.service';
import {CustomerDTO} from '../../../api/business';

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
  private readonly authService = inject(AuthService);
  readonly anon = input<CustomerDTO>();
  protected readonly authState = this.authService.getIsAuthenticated();
  protected readonly name = this.authService.getName();
  protected readonly email = this.authService.getEmail();
  protected readonly phone = this.authService.getPhoneNumber();
}
