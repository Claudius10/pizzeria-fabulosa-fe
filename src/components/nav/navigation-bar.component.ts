import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {LoginDialogComponent} from './login/login-dialog.component';
import {LogoutDialogComponent} from './logout/logout-dialog.component';
import {LocaleSelectorComponent} from './locale-selector/locale-selector.component';
import {CartComponent} from '../cart/cart.component';
import {ProgressBar} from 'primeng/progressbar';
import {LoadingAnimationService} from '../../services/animation/loading-animation.service';
import {CartService} from '../../services/cart/cart.service';
import {BadgeDirective} from 'primeng/badge';
import {Drawer} from 'primeng/drawer';
import {ThemeSelectorComponent} from './theme-selector/theme-selector.component';
import {PrimeTemplate} from 'primeng/api';

@Component({
  selector: 'app-navigation-bar',
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    BadgeDirective,
    LoginDialogComponent,
    LogoutDialogComponent,
    LocaleSelectorComponent,
    ThemeSelectorComponent,
    ProgressBar,
    Drawer,
    CartComponent,
    NgOptimizedImage,
    PrimeTemplate
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent {
  protected authService = inject(AuthService);
  protected cartService = inject(CartService);
  protected linksDrawerVisible = false;
  protected drawerCartVisible = false;
  private loadingAnimationService = inject(LoadingAnimationService);
  protected isLoading: Signal<boolean> = this.loadingAnimationService.getIsLoading();

  protected toggleMobileLinksDrawer() {
    this.linksDrawerVisible = !this.linksDrawerVisible;
  }

  protected toggleCartDrawer() {
    this.drawerCartVisible = !this.drawerCartVisible;
  }

  protected hideCartDrawer(event: boolean) {
    this.drawerCartVisible = event;
  }

  protected hideMobileLinksDrawer() {
    this.linksDrawerVisible = false;
  }

  protected showLoginDialog() {
    this.authService.loginDialogVisibility.set(true);
  }

  protected showLogoutDialog() {
    this.authService.logoutDialogVisibility.set(true);
  }
}
