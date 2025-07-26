import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {CardModule} from 'primeng/card';
import {TranslatePipe} from '@ngx-translate/core';
import {OrderDetailsDTO} from '../../../../../../api/business';

@Component({
  selector: 'app-order-details',
  imports: [
    CardModule,
    TranslatePipe
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsComponent {
  readonly orderDetails = input.required<OrderDetailsDTO>();
}
