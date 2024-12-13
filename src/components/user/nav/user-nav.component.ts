import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {MenubarModule} from 'primeng/menubar';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [
    RouterLink,
    MenubarModule
  ],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserNavComponent {
  menu: MenuItem[] = [
    {
      label: "Profile",
      icon: 'pi pi-user',
      route: "profile",
    },
    {
      label: "Order history",
      icon: 'pi pi-list',
      route: "orders"
    },
    {
      label: "Settings",
      icon: 'pi pi-cog',
      route: "settings",
    },
  ];
}
