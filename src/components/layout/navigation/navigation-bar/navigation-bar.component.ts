import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {LoginDialogComponent} from '../login/login-dialog.component';
import {LogoutDialogComponent} from '../logout/logout-dialog.component';
import {ThemeSelectorComponent} from '../../theme-selector/theme-selector.component';
import {LocaleSelectorComponent} from '../../locale-selector/locale-selector.component';
import {ToastModule} from 'primeng/toast';
import {SidebarModule} from 'primeng/sidebar';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    RouterLinkActive,
    TranslatePipe,
    LoginDialogComponent,
    LogoutDialogComponent,
    ThemeSelectorComponent,
    LocaleSelectorComponent,
    ToastModule,
    SidebarModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  loginDialog: Signal<boolean> = this.authService.getLoginDialog();
  logoutDialog: Signal<boolean> = this.authService.getLogoutDialog();
  isAuthenticated: Signal<boolean> = this.authService.getIsAuthenticated();
  sidebarVisible = false;

  toggleMobileMenu() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  hideMobileMenu() {
    this.sidebarVisible = false;
  }

  showLoginDialog() {
    this.authService.setLoginDialog(true);
  }

  showLogoutDialog() {
    this.authService.setLogoutDialog(true);
  }
}
