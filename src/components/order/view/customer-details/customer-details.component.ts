import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerDetailsComponent {

}
