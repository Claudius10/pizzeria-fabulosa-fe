import {ChangeDetectionStrategy, Component} from '@angular/core';
import {userMenuBar} from '../../../../primeng/menubar';
import {TranslatePipe} from '@ngx-translate/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {Menubar} from 'primeng/menubar';
import {
  INCIDENTS_ORIGIN_ADMIN_RESOURCE_SERVER,
  INCIDENTS_ORIGIN_BUSINESS_RESOURCE_SERVER,
  INCIDENTS_ORIGIN_PUBLIC_RESOURCE_SERVER,
  INCIDENTS_ORIGIN_SECURITY_SERVER,
  INCIDENTS_ORIGIN_USER_RESOURCE_SERVER
} from '../../../../utils/constants';

@Component({
  selector: 'app-admin-nav',
  imports: [
    TranslatePipe,
    RouterLink,
    Menubar,
    RouterLinkActive
  ],
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminNavComponent {
  protected readonly adminMenu = [
    {
      label: "component.admin.nav.metrics",
      icon: 'pi pi-gauge',
      route: "dashboard"
    },
    {
      label: "component.admin.nav.incidents",
      icon: 'pi pi-exclamation-triangle',
      items: [
        {
          label: INCIDENTS_ORIGIN_PUBLIC_RESOURCE_SERVER,
          icon: 'pi pi-server',
          route: "incidents/" + INCIDENTS_ORIGIN_PUBLIC_RESOURCE_SERVER
        },
        {
          label: INCIDENTS_ORIGIN_BUSINESS_RESOURCE_SERVER,
          icon: 'pi pi-server',
          route: "incidents/" + INCIDENTS_ORIGIN_BUSINESS_RESOURCE_SERVER
        },
        {
          label: INCIDENTS_ORIGIN_USER_RESOURCE_SERVER,
          icon: 'pi pi-server',
          route: "incidents/" + INCIDENTS_ORIGIN_USER_RESOURCE_SERVER
        },
        {
          label: INCIDENTS_ORIGIN_ADMIN_RESOURCE_SERVER,
          icon: 'pi pi-server',
          route: "incidents/" + INCIDENTS_ORIGIN_ADMIN_RESOURCE_SERVER
        },
        {
          label: INCIDENTS_ORIGIN_SECURITY_SERVER,
          icon: 'pi pi-server',
          route: "incidents/" + INCIDENTS_ORIGIN_SECURITY_SERVER
        },
      ]
    },
  ];

  protected readonly userMenuBar = userMenuBar;
}
