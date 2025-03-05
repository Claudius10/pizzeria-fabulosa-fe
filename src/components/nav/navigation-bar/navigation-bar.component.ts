import {ChangeDetectionStrategy, Component, effect, inject, Signal, signal, untracked} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass, NgOptimizedImage, NgStyle} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {LoginDialogComponent} from '../login/login-dialog.component';
import {LogoutDialogComponent} from '../logout/logout-dialog.component';
import {LocaleSelectorComponent} from '../locale-selector/locale-selector.component';
import {CartComponent} from '../../cart/cart.component';
import {ProgressBar} from 'primeng/progressbar';
import {LoadingAnimationService} from '../../../services/animation/loading-animation.service';
import {CartService} from '../../../services/cart/cart.service';
import {BadgeDirective} from 'primeng/badge';
import {Drawer} from 'primeng/drawer';
import {ThemeSelectorComponent} from '../theme-selector/theme-selector.component';

@Component({
  selector: 'app-navigation-bar',
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    BadgeDirective,
    NgClass,
    NgStyle,
    LoginDialogComponent,
    LogoutDialogComponent,
    LocaleSelectorComponent,
    ThemeSelectorComponent,
    ProgressBar,
    Drawer,
    CartComponent,
    NgOptimizedImage
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent {
  private loadingAnimationService = inject(LoadingAnimationService);
  protected authService = inject(AuthService);
  protected cartService = inject(CartService);
  isLoading: Signal<boolean> = this.loadingAnimationService.getIsLoading();
  linksDrawerVisible = false;
  drawerCartVisible = false;
  bump = signal(false);

  constructor() {
    // cart bump animation whenever quantity changes
    effect((onCleanup) => {
      if (this.cartService.quantity() === 0) {
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
