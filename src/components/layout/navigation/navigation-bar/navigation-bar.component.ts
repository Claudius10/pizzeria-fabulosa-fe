import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ThemeSelectorComponent} from '../../theme-selector/theme-selector.component';
import {AuthService} from '../../../../services/auth/auth.service';
import {LocaleSelectorComponent} from '../../locale-selector/locale-selector.component';
import {ToastModule} from 'primeng/toast';
import {LogoutDialogComponent} from '../logout/logout-dialog.component';
import {ConfirmationService, MessageService} from 'primeng/api';
import {LoginDialogComponent} from '../login/login-dialog.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    LoginDialogComponent,
    LogoutDialogComponent,
    ToastModule,
    ThemeSelectorComponent,
    LocaleSelectorComponent

  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent {
  private authService = inject(AuthService);
  loginDialog: Signal<boolean> = this.authService.getLoginDialog();
  logoutDialog: Signal<boolean> = this.authService.getLogoutDialog();
  isAuthenticated: Signal<boolean> = this.authService.getIsAuthenticated();

  showLoginDialog() {
    this.authService.setLoginDialog(true);
  }

  showLogoutDialog() {
    this.authService.setLogoutDialog(true);
  }
}
