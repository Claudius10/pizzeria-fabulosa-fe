import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {AuthService} from '../../../services/auth/auth.service';
import {AddressItemComponent} from '../address-item/address-item.component';
import {toSignal} from '@angular/core/rxjs-interop';
import {
  UserAddressFormComponent
} from '../../forms/user/user-address-form/user-address-form/user-address-form.component';

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
  private userService = inject(UserService);
  private authService = inject(AuthService);
  addressList = toSignal(this.userService.getAddressList(this.authService.getUserId()), {initialValue: []});
  showAddressForm = signal(false);

  public toggleAddressForm() {
    this.showAddressForm.set(!this.showAddressForm());
  }
}
