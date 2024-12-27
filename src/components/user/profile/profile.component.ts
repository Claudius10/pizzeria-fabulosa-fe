import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {UserAddressListComponent} from './user-address/user-address-list/user-address-list.component';
import {CardModule} from 'primeng/card';
import {Button} from 'primeng/button';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    UserAddressListComponent,
    CardModule,
    Button,
    TranslatePipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  private authService = inject(AuthService);
  userName = this.authService.getUserName();
  userEmail = this.authService.getUserEmail();
  userContactNumber = this.authService.getUserContactNumber();
  viewAddressList = signal(false);

  toggleAddressList() {
    this.viewAddressList.set(!this.viewAddressList());
  }
}
