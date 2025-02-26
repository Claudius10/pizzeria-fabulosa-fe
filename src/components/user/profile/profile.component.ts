import {ChangeDetectionStrategy, Component} from '@angular/core';
import {UserAddressListComponent} from './user-address/user-address-list/user-address-list.component';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {TranslatePipe} from '@ngx-translate/core';
import {UserDetailsComponent} from '../details/user-details.component';

@Component({
  selector: 'app-profile',
  imports: [
    Card,
    UserDetailsComponent,
    Button,
    TranslatePipe,
    UserAddressListComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  viewAddressList = false;

  toggleAddressList() {
    this.viewAddressList = !this.viewAddressList;
  }
}
