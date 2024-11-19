import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {
  UserAddressFormComponent
} from '../../forms/user/address-form/user-address-form.component';
import {USER_ADDRESS_LIST} from '../../../interfaces/query-keys';
import {SUCCESS} from '../../../utils/constants';
import {UserService} from '../../../services/user/user.service';
import {UserAddressItemComponent} from '../user-address-item/user-address-item.component';

@Component({
  selector: 'app-user-address-list',
  standalone: true,
  imports: [
    UserAddressFormComponent,
    UserAddressItemComponent
  ],
  templateUrl: './user-address-list.component.html',
  styleUrl: './user-address-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAddressListComponent {
  protected readonly SUCCESS = SUCCESS;
  private userService = inject(UserService);
  private authService = inject(AuthService);
  protected addressList = this.userService.findUserAddressList({
    queryKey: USER_ADDRESS_LIST,
    userId: this.authService.getUserId()
  });
  showAddressForm = signal(false);

  public toggleAddressForm() {
    this.showAddressForm.set(!this.showAddressForm());
  }
}
