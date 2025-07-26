import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {OrderSummaryDTO} from '../../../../../api/business';

@Component({
  selector: 'app-order-summary',
  imports: [
    Card,
    RouterLink,
    TranslatePipe,
    Button
  ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryComponent {
  readonly orderSummary = input.required<OrderSummaryDTO>();

}
