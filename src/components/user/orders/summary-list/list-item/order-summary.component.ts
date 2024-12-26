import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {OrderSummaryDTO} from '../../../../../interfaces/dto/order';
import {RouterLink} from '@angular/router';
import {CardModule} from 'primeng/card';
import {TranslatePipe} from '@ngx-translate/core';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [
    RouterLink,
    CardModule,
    TranslatePipe,
    Button
  ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryComponent {
  orderSummary = input.required<OrderSummaryDTO>();

}
