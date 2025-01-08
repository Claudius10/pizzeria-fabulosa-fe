import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {OrderSummaryDTO} from '../../../../../interfaces/dto/order';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {Button} from 'primeng/button';
import {CardModule} from 'primeng/card';

@Component({
    selector: 'app-order-summary',
    imports: [
        RouterLink,
        TranslatePipe,
        Button,
        CardModule
    ],
    templateUrl: './order-summary.component.html',
    styleUrl: './order-summary.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryComponent {
  orderSummary = input.required<OrderSummaryDTO>();

}
