import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin-nav-buttons',
  imports: [
    RouterLink
  ],
  templateUrl: './admin-nav-buttons.component.html',
  styleUrl: './admin-nav-buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminNavButtonsComponent {
}
