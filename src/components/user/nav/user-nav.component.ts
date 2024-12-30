import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MenubarModule} from 'primeng/menubar';
import {TranslatePipe} from '@ngx-translate/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
    selector: 'app-user-nav',
  imports: [
    MenubarModule,
    TranslatePipe,
    RouterLinkActive,
    RouterLink
  ],
    templateUrl: './user-nav.component.html',
    styleUrl: './user-nav.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserNavComponent {
  userProfileMenu = signal<MenuItem[]>(getMenuItems());
}

function getMenuItems() {
  return [
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
}
