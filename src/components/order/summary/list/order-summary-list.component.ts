import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
import {PaginatorModule, PaginatorState} from 'primeng/paginator';
import {OrderService} from '../../../../services/http/order/order.service';
import {QueryResult} from '../../../../interfaces/query';
import {OrderSummaryComponent} from '../list-item/order-summary.component';

@Component({
  selector: 'app-order-summary-list',
  standalone: true,
  imports: [
    PaginatorModule,
    OrderSummaryComponent
  ],
  templateUrl: './order-summary-list.component.html',
  styleUrl: './order-summary-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryListComponent {
  private authService = inject(AuthService);
  private orderService = inject(OrderService);
  private pageNumber = this.orderService.getPageNumber();
  currentElements = 0;
  orderList: QueryResult = this.orderService.findOrderSummaryList(this.authService.getUserId());

  constructor() {
    this.currentElements = (this.pageNumber() * 4) - 4;
  }

  onPageChange(event: PaginatorState) {
    const page = event.page === undefined ? 1 : event.page + 1;
    this.orderService.setPageNumber(page);
    this.currentElements = (page * 4) - 4;
  }
}
