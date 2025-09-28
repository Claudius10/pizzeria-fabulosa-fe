import {ChangeDetectionStrategy, Component} from '@angular/core';
import {OrderStatsComponent} from './order/order-stats.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    OrderStatsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

}
