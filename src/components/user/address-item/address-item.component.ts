import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {AddressDTO} from '../../../interfaces/dto/order';

@Component({
  selector: 'app-address-item',
  standalone: true,
  imports: [],
  templateUrl: './address-item.component.html',
  styleUrl: './address-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressItemComponent {
  address = input.required<AddressDTO>();

}
