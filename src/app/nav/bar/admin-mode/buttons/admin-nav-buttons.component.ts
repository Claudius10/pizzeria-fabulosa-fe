import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Drawer} from 'primeng/drawer';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-admin-nav-buttons',
  imports: [
    Drawer,
    RouterLink,
    RouterLinkActive,
    TranslatePipe
  ],
  templateUrl: './admin-nav-buttons.component.html',
  styleUrl: './admin-nav-buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminNavButtonsComponent {
  protected linksDrawerVisible = false;

  protected toggleMobileLinksDrawer() {
    this.linksDrawerVisible = !this.linksDrawerVisible;
  }

  protected hideMobileLinksDrawer() {
    this.linksDrawerVisible = false;
  }
}
