import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {Menubar} from 'primeng/menubar';
import {userMenuBar} from '../../../primeng/menubar';
import {PasswordAuthorizationComponent} from '../../util/password/password-authorization.component';
import {AuthService} from '../../services/auth/auth.service';
import {TranslatePipe} from '@ngx-translate/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-user-nav',
  imports: [
    Menubar,
    PasswordAuthorizationComponent,
    TranslatePipe,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserNavComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  protected passAuthVisibility = false;
  protected userProfileMenu = [
    {
      label: "component.user.nav.profile",
      icon: 'pi pi-user',
      route: "profile",
    },
    {
      label: "component.user.nav.order.history",
      icon: 'pi pi-list',
      route: "orders"
    },
    {
      label: "component.user.nav.settings",
      icon: 'pi pi-cog',
      route: "settings",
    },
  ];

  ngOnInit(): void {
    if (this.authService.isAdmin()) {
      const adminMenuItem = {
        label: "component.user.nav.admin",
        icon: 'pi pi-building-columns',
        command: () => {
          this.passAuthVisibility = true;
        }
      };

      // @ts-ignore
      this.userProfileMenu.push(adminMenuItem);
    }
  }

  protected onAuthorizedPassword(password: string) {
    this.router.navigate(['admin']);
  }

  protected readonly userMenuBar = userMenuBar;
}
