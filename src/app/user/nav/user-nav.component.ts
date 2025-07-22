import {ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Menubar} from 'primeng/menubar';
import {userMenuBar} from '../../../primeng/menubar';
import {PasswordAuthorizationComponent} from '../../util/password/password-authorization.component';
import {TranslatePipe} from '@ngx-translate/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {ADMIN, ADMIN_MODE} from '../../../utils/constants';

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
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isServer = !isPlatformBrowser(this.platformId);
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageService);
  protected readonly userProfileMenu = [
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
  protected passAuthVisibility = false;

  ngOnInit(): void {
    if (!this.isServer && this.localStorageService.exists(ADMIN)) {
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
    this.localStorageService.add(ADMIN_MODE, "true");
    this.router.navigate(['admin']);
  }

  protected readonly userMenuBar = userMenuBar;
}
