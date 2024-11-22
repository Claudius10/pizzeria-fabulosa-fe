import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {OrderSummaryComponent} from '../order-summary/order-summary.component';
import {PaginatorModule, PaginatorState} from 'primeng/paginator';
import {OrderService} from '../../../services/http/order/order.service';

@Component({
  selector: 'app-order-summary-list',
  standalone: true,
  imports: [
    OrderSummaryComponent,
    PaginatorModule
  ],
  templateUrl: './order-summary-list.component.html',
  styleUrl: './order-summary-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryListComponent {
  private authService = inject(AuthService);
  private orderService = inject(OrderService);
  currentElements = 0;
  orderSummaryList = this.orderService.findOrderSummaryList(this.authService.getUserId());

  onPageChange(event: PaginatorState) {
    const page = event.page === undefined ? 1 : event.page + 1;
    this.orderService.setPageNumber(page);
    this.currentElements = (page * 5) - 5;
  }
}
