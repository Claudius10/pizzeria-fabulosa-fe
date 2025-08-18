import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {BadgeDirective} from "primeng/badge";
import {RouterLink} from '@angular/router';
import {AuthService} from '../../../../services/auth/auth.service';
import {CartService} from '../../../../services/cart/cart.service';
import {RenderService} from '../../../../services/ui/render.service';

@Component({
  selector: 'app-user-nav-buttons',
  imports: [
    BadgeDirective,
    RouterLink
  ],
  templateUrl: './user-nav-buttons.component.html',
  styleUrl: './user-nav-buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserNavButtonsComponent {
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly renderService = inject(RenderService);
  protected readonly isAuthenticated = this.authService.getIsAuthenticated();
  protected readonly cartQuantity = this.cartService.getQuantity();

  protected showCartDrawer() {
    this.renderService.switchCartDrawer(true);
  }

  protected showLogin() {
    this.renderService.switchLogin(true);
  }

  protected showLogout() {
    this.renderService.switchLogout(true);
  }
}
