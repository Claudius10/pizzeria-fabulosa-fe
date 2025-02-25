import {ChangeDetectionStrategy, Component, effect, inject, signal, Signal, untracked} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass, NgStyle} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {LoginDialogComponent} from '../login/login-dialog.component';
import {LogoutDialogComponent} from '../logout/logout-dialog.component';
import {LocaleSelectorComponent} from '../locale-selector/locale-selector.component';
import {SidebarModule} from 'primeng/sidebar';
import {CartComponent} from '../../cart/cart.component';
import {ProgressBarModule} from 'primeng/progressbar';
import {LoadingAnimationService} from '../../../services/navigation/loading-animation.service';
import {CartService} from '../../../services/cart/cart.service';
import {BadgeModule} from 'primeng/badge';
import {Drawer} from 'primeng/drawer';

@Component({
  selector: 'app-navigation-bar',
  imports: [
    RouterLink,
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
    Drawer
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent {
  private authService = inject(AuthService);
  private loadingAnimationService = inject(LoadingAnimationService);
  protected cartService = inject(CartService);
  isLoading: Signal<boolean> = this.loadingAnimationService.getIsLoading();
  loginDialog: Signal<boolean> = this.authService.getLoginDialog();
  logoutDialog: Signal<boolean> = this.authService.getLogoutDialog();
  isAuthenticated: Signal<boolean> = this.authService.getIsAuthenticated();
  linksDrawerVisible = false;
  drawerCartVisible = false;
  bump = signal(false);

  constructor() {
    // cart bump animation whenever quantity changes
    effect((onCleanup) => {
      if (this.cartService.quantity === 0) {
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

  toggleMobileLinksDrawer() {
    this.linksDrawerVisible = !this.linksDrawerVisible;
  }

  toggleCartDrawer() {
    this.drawerCartVisible = !this.drawerCartVisible;
  }

  hideCartDrawer(event: boolean) {
    this.drawerCartVisible = event;
  }

  hideMobileLinksDrawer() {
    this.linksDrawerVisible = false;
  }

  showLoginDialog() {
    this.authService.setLoginDialog(true);
  }

  showLogoutDialog() {
    this.authService.setLogoutDialog(true);
  }
}
