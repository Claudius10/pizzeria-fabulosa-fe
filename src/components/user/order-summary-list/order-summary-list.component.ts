import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {OrderSummaryComponent} from '../order-summary/order-summary.component';
import {OrderService} from '../../../services/order/order.service';

@Component({
  selector: 'app-order-summary-list',
  standalone: true,
  imports: [
    OrderSummaryComponent
  ],
  templateUrl: './order-summary-list.component.html',
  styleUrl: './order-summary-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryListComponent {
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private orderService = inject(OrderService);
  protected orderSummaryList = this.orderService.getOrderSummaryList();

  constructor() {
    if (this.orderSummaryList().orderList.length === 0) {
      const subscription = this.orderService.findOrderSummaryList(this.authService.getUserId(), 0, 5).subscribe({
        next: orderSummaryList => {
          this.orderService.setOrderSummaryList(orderSummaryList);
        }
      });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }
}
