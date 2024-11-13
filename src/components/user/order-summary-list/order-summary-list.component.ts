import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {OrderSummaryComponent} from '../order-summary/order-summary.component';
import {OrderService} from '../../../services/order/order.service';
import {injectQueryClient} from '@tanstack/angular-query-experimental';
import {USER_ORDER_SUMMARY_LIST} from '../../../query-keys';

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
  private queryClient = injectQueryClient();
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private orderService = inject(OrderService);
  orderSummaryList =
    this.orderService.findOrderSummaryList(USER_ORDER_SUMMARY_LIST, this.authService.getUserId(), 0, 5);

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.queryClient.cancelQueries({queryKey: USER_ORDER_SUMMARY_LIST});
    });
  }
}
