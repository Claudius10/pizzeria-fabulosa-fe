import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {AddressItemComponent} from '../address-item/address-item.component';
import {
  UserAddressFormComponent
} from '../../forms/user/user-address-form/user-address-form/user-address-form.component';
import {AddressService} from '../../../services/address/address.service';

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
  private destroyRef = inject(DestroyRef);
  private addressService = inject(AddressService);
  private authService = inject(AuthService);
  protected addressList = this.addressService.getAddressList();
  showAddressForm = signal(false);

  constructor() {
    if (this.addressList().length === 0) {
      const subscription = this.addressService.findAddressList(this.authService.getUserId()).subscribe({
        next: addressList => {
          this.addressService.setAddressList(addressList);
        }
      });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }

  public toggleAddressForm() {
    this.showAddressForm.set(!this.showAddressForm());
  }
}
