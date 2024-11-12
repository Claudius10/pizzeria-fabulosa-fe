import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {OrderDetailsDTO} from '../../../interfaces/dto/order';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsComponent {
  orderDetails = input.required<OrderDetailsDTO>();

}
