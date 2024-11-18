import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {AddressItemComponent} from '../address-item/address-item.component';
import {
  UserAddressFormComponent
} from '../../forms/user/user-address-form/user-address-form/user-address-form.component';
import {AddressService} from '../../../services/address/address.service';
import {USER_ADDRESS_LIST} from '../../../interfaces/query-keys';
import {SUCCESS} from '../../../utils/constants';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [
    AddressItemComponent,
    UserAddressFormComponent
  ],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressListComponent {

  // TODO - add input with address list

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
