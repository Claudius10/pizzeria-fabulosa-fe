import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {NgClass} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {Address} from '../../../../../services/checkout/checkout-form.service';

@Component({
  selector: 'app-user-address-select',
  imports: [
    NgClass,
    TranslatePipe
  ],
  templateUrl: './user-address-select.component.html',
  styleUrl: './user-address-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAddressSelectComponent {
  address = input.required<string>();
  invalid = input.required<boolean>();
  selected = input<string | null>(null);
  onAddressSelect = output<Address>();

  protected selectAddress(address: string) {
    this.onAddressSelect.emit({name: address, isStore: false});
  }
}
