import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Card} from 'primeng/card';
import {UserDetailsComponent} from '../details/user-details.component';

@Component({
  selector: 'app-profile',
  imports: [
    Card,
    UserDetailsComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

}
