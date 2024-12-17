import {ChangeDetectionStrategy, Component, inject, input, output} from '@angular/core';
import {USER_ADDRESS_LIST} from '../../../../../../utils/query-keys';
import {UserService} from '../../../../../../services/http/user/user.service';
import {AuthService} from '../../../../../../services/auth/auth.service';
import {CardModule} from 'primeng/card';
import {NgClass} from '@angular/common';
import {AddressId} from '../../../../../../services/forms/checkout/checkout-form.service';

@Component({
  selector: 'app-user-address-list-view',
  standalone: true,
  imports: [
    CardModule,
    NgClass
  ],
  templateUrl: './user-address-list-view.component.html',
  styleUrl: './user-address-list-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAddressListViewComponent {
  onAddressSelect = output<AddressId>();
  selected = input<number | null>(null);
  valid = input<boolean>();
  private userService = inject(UserService);
  private authService = inject(AuthService);
  protected addressList = this.userService.findUserAddressList({
    queryKey: USER_ADDRESS_LIST,
    userId: this.authService.getUserId()
  });

  selectAddress(id: number) {
    this.onAddressSelect.emit({id: id, isStore: false});
  }
}
