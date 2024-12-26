import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {OrderSummaryDTO} from '../../../../../interfaces/dto/order';
import {RouterLink} from '@angular/router';
import {CardModule} from 'primeng/card';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [
    RouterLink,
    CardModule
  ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryComponent {
  orderSummary = input.required<OrderSummaryDTO>();

}
