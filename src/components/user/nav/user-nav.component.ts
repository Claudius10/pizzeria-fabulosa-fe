import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserNavComponent {

}
