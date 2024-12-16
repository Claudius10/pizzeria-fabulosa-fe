import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
import {OrderSummaryComponent} from '../item/order-summary.component';
import {PaginatorModule, PaginatorState} from 'primeng/paginator';
import {OrderService} from '../../../../services/http/order/order.service';
import {OrderSummaryListDTO} from '../../../../interfaces/dto/order';
import {QueryResult} from '../../../../interfaces/query';

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
  orderSummaryListQueryResult: QueryResult = this.orderService.findOrderSummaryList(this.authService.getUserId());
  orderSummaryList = this.orderSummaryListQueryResult.data()?.payload as OrderSummaryListDTO;

  onPageChange(event: PaginatorState) {
    const page = event.page === undefined ? 1 : event.page + 1;
    this.orderService.setPageNumber(page);
    this.currentElements = (page * 5) - 5;
  }
}
