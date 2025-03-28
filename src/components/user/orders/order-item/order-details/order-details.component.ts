import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {CardModule} from 'primeng/card';
import {OrderDetailsDTO} from '../../../../../utils/interfaces/dto/order';
import {TranslatePipe} from '@ngx-translate/core';

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
  orderDetails = input.required<OrderDetailsDTO>();
}
