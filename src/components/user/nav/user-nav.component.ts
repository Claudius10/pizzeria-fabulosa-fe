import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserNavComponent {

}
