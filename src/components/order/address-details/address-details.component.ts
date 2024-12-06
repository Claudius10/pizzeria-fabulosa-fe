import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-address-details',
  standalone: true,
  imports: [],
  templateUrl: './address-details.component.html',
  styleUrl: './address-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressDetailsComponent {

}
