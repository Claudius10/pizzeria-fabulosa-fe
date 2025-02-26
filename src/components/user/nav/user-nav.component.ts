import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Menubar} from 'primeng/menubar';
import {TranslatePipe} from '@ngx-translate/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {userMenuBar} from '../../../primeng/menubar';

@Component({
  selector: 'app-user-nav',
  imports: [
    Menubar,
    RouterLinkActive,
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserNavComponent {
  userProfileMenu = [
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
  protected readonly userMenuBar = userMenuBar;
}
