import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {OrderSummaryDTO} from '../../../interfaces/dto/order';

@Component({
  selector: 'app-order-summary-item',
  standalone: true,
  imports: [],
  templateUrl: './order-summary-item.component.html',
  styleUrl: './order-summary-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryItemComponent {
  orderSummaryItem = input.required<OrderSummaryDTO>();

}
