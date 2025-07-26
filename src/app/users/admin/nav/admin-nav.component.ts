import {ChangeDetectionStrategy, Component} from '@angular/core';
import {userMenuBar} from '../../../../primeng/menubar';
import {TranslatePipe} from '@ngx-translate/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {Menubar} from 'primeng/menubar';
import {INCIDENTS_ORIGIN_PUBLIC_RESOURCE_SERVER} from '../../../../utils/constants';

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
      label: "component.admin.nav.incidents",
      icon: 'pi pi-exclamation-triangle',
      route: "incidents/" + INCIDENTS_ORIGIN_PUBLIC_RESOURCE_SERVER,
    },
  ];

  protected readonly userMenuBar = userMenuBar;
}
