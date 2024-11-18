import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {AddressDTO} from '../../../interfaces/dto/order';

@Component({
  selector: 'app-user-address-item',
  standalone: true,
  imports: [],
  templateUrl: './user-address-item.component.html',
  styleUrl: './user-address-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAddressItemComponent {
  address = input.required<AddressDTO>();

}
