import {ChangeDetectionStrategy, Component, effect, inject, signal, Signal, untracked} from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass, NgOptimizedImage, NgStyle} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {LoginDialogComponent} from '../login/login-dialog.component';
import {LogoutDialogComponent} from '../logout/logout-dialog.component';
import {ThemeSelectorComponent} from '../../theme-selector/theme-selector.component';
import {LocaleSelectorComponent} from '../../locale-selector/locale-selector.component';
import {ToastModule} from 'primeng/toast';
import {SidebarModule} from 'primeng/sidebar';
import {CartComponent} from '../../../cart/cart.component';
import {ProgressBarModule} from 'primeng/progressbar';
import {NavigationService} from '../../../../services/navigation/navigation.service';
import {CartService} from '../../../../services/cart/cart.service';

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
    SidebarModule,
    CartComponent,
    ProgressBarModule,
    NgStyle,
    NgClass
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent {
  private authService = inject(AuthService);
  private navigationService = inject(NavigationService);
  private cartService = inject(CartService);
  cartQuantity = this.cartService.cartQuantity;
  isLoading: Signal<boolean> = this.navigationService.getIsLoading();
  loginDialog: Signal<boolean> = this.authService.getLoginDialog();
  logoutDialog: Signal<boolean> = this.authService.getLogoutDialog();
  isAuthenticated: Signal<boolean> = this.authService.getIsAuthenticated();
  sidebarMobileMenuVisible = false;
  sidebarCartVisible = false;
  bump = signal(false);

  constructor() {
    effect((onCleanup) => {
      if (this.cartQuantity() === 0) {
        return;
      }

      untracked(() => {
        this.bump.set(true);
      });

      const timer = setTimeout(() => {
        untracked(() => {
          this.bump.set(false);
        });
      }, 300);

      onCleanup(() => {
        clearTimeout(timer);
      });
    });
  }

  toggleMobileSidePanelMenu() {
    this.sidebarMobileMenuVisible = !this.sidebarMobileMenuVisible;
  }

  toggleCartSidePanel() {
    this.sidebarCartVisible = !this.sidebarCartVisible;
  }

  hideCartSidePanelMenu(event: boolean) {
    this.sidebarCartVisible = event;
  }

  hideMobileSidePanelMenu() {
    this.sidebarMobileMenuVisible = false;
  }

  showLoginDialog() {
    this.authService.setLoginDialog(true);
  }

  showLogoutDialog() {
    this.authService.setLogoutDialog(true);
  }
}
