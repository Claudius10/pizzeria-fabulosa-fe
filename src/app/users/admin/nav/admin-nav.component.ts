import {ChangeDetectionStrategy, Component} from '@angular/core';
import {userMenuBar} from '../../../../primeng/menubar';
import {TranslatePipe} from '@ngx-translate/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {Menubar} from 'primeng/menubar';
import {ADMIN_RESOURCE_SERVER, BUSINESS_RESOURCE_SERVER, PUBLIC_RESOURCE_SERVER, SECURITY_SERVER} from '../../../../utils/constants';

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
          label: PUBLIC_RESOURCE_SERVER,
          icon: 'pi pi-server',
          route: "incidents/" + PUBLIC_RESOURCE_SERVER
        },
        {
          label: BUSINESS_RESOURCE_SERVER,
          icon: 'pi pi-server',
          route: "incidents/" + BUSINESS_RESOURCE_SERVER
        },
        {
          label: ADMIN_RESOURCE_SERVER,
          icon: 'pi pi-server',
          route: "incidents/" + ADMIN_RESOURCE_SERVER
        },
        {
          label: SECURITY_SERVER,
          icon: 'pi pi-server',
          route: "incidents/" + SECURITY_SERVER,
        }
      ]
    },
  ];

  protected readonly userMenuBar = userMenuBar;
}
