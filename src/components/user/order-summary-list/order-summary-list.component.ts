import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {OrderSummaryComponent} from '../order-summary/order-summary.component';
import {OrderService} from '../../../services/order/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PaginatorModule, PaginatorState} from 'primeng/paginator';
import {OrderSummaryListQueryResult} from '../../../interfaces/query';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {OrderHttpService} from '../../../services/order/order-http.service';

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
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private pageNumber = signal(1);
  private orderHttpService = inject(OrderHttpService);
  currentElements: number = 0;

  subscription = this.activatedRoute.queryParams.subscribe({
    next: (value) => {
      const number = Number(value['page']);
      this.pageNumber.set(number);
      this.currentElements = (number * 5) - 5;
    }
  });

  query = injectQuery(() => ({
    queryKey: ["user", "order", "summary", this.pageNumber() - 1, 5],
    queryFn: () => lastValueFrom(this.orderHttpService.findOrderSummaryList(this.authService.getUserId(), this.pageNumber() - 1, 5))
  }));

  orderSummaryList: OrderSummaryListQueryResult = {
    data: this.query.data,
    status: this.query.status,
    error: this.query.error,
  };

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.subscription.unsubscribe();
    });
  }

  onPageChange(event: PaginatorState) {
    const page = event.page === undefined ? 1 : event.page + 1;
    this.router.navigate(
      ["usuario", "pedidos"],
      {
        queryParams: {page: `${page.toString()}`},
        queryParamsHandling: "replace"
      }
    );
  }
}
