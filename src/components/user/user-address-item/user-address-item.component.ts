import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {AddressDTO} from '../../../interfaces/dto/order';
import {Button} from 'primeng/button';
import {UserService} from '../../../services/http/user/user.service';
import {ResponseDTO} from '../../../interfaces/http/api';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-user-address-item',
  standalone: true,
  imports: [
    Button
  ],
  templateUrl: './user-address-item.component.html',
  styleUrl: './user-address-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAddressItemComponent {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private deleteUserAddress = this.userService.deleteUserAddress();
  address = input.required<AddressDTO>();

  deleteAddress(id: number) {
    this.deleteUserAddress.mutate({
      payload: {
        userId: this.authService.getUserId(),
        addressId: id
      }
    }, {
      onSuccess: (response: ResponseDTO) => {
        console.log(response);
      },
      onError: () => {
      },
      onSettled: () => {
      }
    });
  }
}
