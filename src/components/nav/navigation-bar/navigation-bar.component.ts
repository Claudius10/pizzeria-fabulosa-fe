import {ChangeDetectionStrategy, Component, effect, inject, signal, Signal, untracked} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass, NgOptimizedImage, NgStyle} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {LoginDialogComponent} from '../../forms/login/login-dialog.component';
import {LogoutDialogComponent} from '../logout/logout-dialog.component';
import {LocaleSelectorComponent} from '../locale-selector/locale-selector.component';
import {SidebarModule} from 'primeng/sidebar';
import {CartComponent} from '../../cart/sidebar/cart.component';
import {ProgressBarModule} from 'primeng/progressbar';
import {LoadingAnimationService} from '../../../services/navigation/loading-animation.service';
import {CartService} from '../../../services/cart/cart.service';
import {BadgeModule} from 'primeng/badge';
import {ThemeSelectorComponent} from '../theme-selector/theme-selector.component';

@Component({
  selector: 'app-navigation-bar',
  imports: [
    RouterLink,
    NgOptimizedImage,
    RouterLinkActive,
    TranslatePipe,
    BadgeModule,
    NgClass,
    NgStyle,
    LoginDialogComponent,
    LogoutDialogComponent,
    LocaleSelectorComponent,
    ProgressBarModule,
    SidebarModule,
    CartComponent,
    ThemeSelectorComponent
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent {
  private authService = inject(AuthService);
  private loadingAnimationService = inject(LoadingAnimationService);
  private cartService = inject(CartService);
  cartQuantity = this.cartService.cartQuantity;
  isLoading: Signal<boolean> = this.loadingAnimationService.getIsLoading();
  loginDialog: Signal<boolean> = this.authService.getLoginDialog();
  logoutDialog: Signal<boolean> = this.authService.getLogoutDialog();
  isAuthenticated: Signal<boolean> = this.authService.getIsAuthenticated();
  sidebarMobileMenuVisible = false;
  sidebarCartVisible = false;
  bump = signal(false);

  constructor() {
    // cart bump animation whenever quantity changes
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
