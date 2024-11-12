import {ChangeDetectionStrategy, Component} from '@angular/core';
import {UserNavComponent} from '../nav/user-nav.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [
    UserNavComponent,
    RouterOutlet
  ],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserHomeComponent {

}
