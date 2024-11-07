import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {AuthService} from '../../../services/auth/auth.service';
import {of} from 'rxjs';
import {AddressItemComponent} from '../address-item/address-item.component';
import {AsyncPipe} from '@angular/common';
import {AddressFormData} from '../../../interfaces/dto/forms/order';
import {toSignal} from '@angular/core/rxjs-interop';
import {
  UserAddressFormComponent
} from '../../forms/user/user-address-form/user-address-form/user-address-form.component';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [
    AddressItemComponent,
    AsyncPipe,
    UserAddressFormComponent
  ],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressListComponent {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  addressList = toSignal(this.getUserAddressList(this.authService.getUserId()), {initialValue: []});
  showAddressForm = signal(false);

  private getUserAddressList(userId: string | undefined) {
    if (userId === undefined) {
      // user not authed - notification
      return of([]);
    }

    return this.userService.getAddressList(userId);
  }


  public toggleAddressForm() {
    this.showAddressForm.set(!this.showAddressForm());
  }
}
