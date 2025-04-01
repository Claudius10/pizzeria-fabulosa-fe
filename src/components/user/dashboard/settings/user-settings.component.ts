import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {UserDeleteFormComponent} from './account-delete/user-delete-form.component';
import {Card} from 'primeng/card';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {Divider} from 'primeng/divider';
import {AuthService} from '../../../../services/common/auth/auth.service';

@Component({
  selector: 'app-settings',
  imports: [
    UserDeleteFormComponent,
    Card,
    AdminLoginComponent,
    Divider
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSettingsComponent {
  protected authService = inject(AuthService);
}
