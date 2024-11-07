import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {RouterOutlet} from '@angular/router';
import {UserNavComponent} from '../nav/user-nav.component';
import {UserService} from '../../../services/user/user.service';
import {AddressListComponent} from '../address-list/address-list.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterOutlet,
    UserNavComponent,
    AddressListComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  showAddressList = signal(false);
  userName = this.authService.getUserName();
  userEmail = this.authService.getUserEmail();

  public toggleAddressList() {
    this.showAddressList.set(!this.showAddressList());
  }
}
