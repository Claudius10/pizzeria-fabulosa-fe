import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import {AuthService} from '../../../../../services/auth/auth.service';
import {PaginatorModule, PaginatorState} from 'primeng/paginator';
import {OrderService} from '../../../../../services/http/order/order.service';
import {QueryResult} from '../../../../../interfaces/query';
import {OrderSummaryComponent} from '../list-item/order-summary.component';
import {LoadingAnimationService} from '../../../../../services/navigation/loading-animation.service';
import {toObservable} from '@angular/core/rxjs-interop';
import {PENDING, SUCCESS} from '../../../../../utils/constants';

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
  private loadingAnimationService = inject(LoadingAnimationService);
  private destroyRef = inject(DestroyRef);
  private pageNumber = this.orderService.getPageNumber();
  currentElements = 0;
  orderList: QueryResult = this.orderService.findOrderSummaryList(this.authService.getUserId());
  orderListStatus = toObservable(this.orderList.status);

  // TODO - prefetch next page

  constructor() {
    this.currentElements = (this.pageNumber() * 4) - 4;

    const subscription = this.orderListStatus.subscribe({
      next: orderListStatus => {

        if (orderListStatus === PENDING) {
          this.loadingAnimationService.startLoading();
        }

        if (orderListStatus === SUCCESS) {
          this.loadingAnimationService.stopLoading();
        }
      }, complete: () => {
        this.loadingAnimationService.stopLoading();
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      this.loadingAnimationService.stopLoading();
    });
  }

  onPageChange(event: PaginatorState) {
    const page = event.page === undefined ? 1 : event.page + 1;
    this.orderService.setPageNumber(page);
    this.currentElements = (page * 4) - 4;
  }
}
