import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ThemeSelectorComponent} from '../../theme-selector/theme-selector.component';
import {AuthService} from '../../../../services/auth/auth.service';
import {LocaleSelectorComponent} from '../../locale-selector/locale-selector.component';
import {ToastModule} from 'primeng/toast';
import {LogoutPopupComponent} from '../logout/logout-popup.component';
import {TranslatePipe} from '@ngx-translate/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {LoginDialogComponent} from '../login/login-dialog.component';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    RouterLink,
    LogoutPopupComponent,
    ThemeSelectorComponent,
    LocaleSelectorComponent,
    ToastModule,
    TranslatePipe,
    LoginDialogComponent
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent {
  private authService = inject(AuthService);
  loginDialog: Signal<boolean> = this.authService.getLoginDialog();
  logoutPopup: Signal<boolean> = this.authService.getLogoutPopup();
  isAuthenticated: Signal<boolean> = this.authService.getIsAuthenticated();

  showDialog() {
    this.authService.setLoginDialog(true);
  }
}
