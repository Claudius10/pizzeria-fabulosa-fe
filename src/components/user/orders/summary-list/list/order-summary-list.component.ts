import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import {AuthService} from '../../../../../services/auth/auth.service';
import {Paginator, PaginatorState} from 'primeng/paginator';
import {OrderService} from '../../../../../services/http/order/order.service';
import {QueryResult} from '../../../../../interfaces/query';
import {OrderSummaryComponent} from '../list-item/order-summary.component';
import {LoadingAnimationService} from '../../../../../services/navigation/loading-animation.service';
import {toObservable} from '@angular/core/rxjs-interop';
import {ERROR, PENDING, SUCCESS} from '../../../../../utils/constants';
import {ErrorService} from '../../../../../services/error/error.service';
import {ServerErrorComponent} from '../../../../app/routes/error/server-no-response/server-error.component';
import {ResponseDTO} from '../../../../../interfaces/http/api';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-order-summary-list',
  imports: [
    ServerErrorComponent,
    OrderSummaryComponent,
    TranslatePipe,
    Paginator
  ],
  templateUrl: './order-summary-list.component.html',
  styleUrl: './order-summary-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryListComponent {
  private loadingAnimationService = inject(LoadingAnimationService);
  private errorService = inject(ErrorService);
  private authService = inject(AuthService);
  private orderService = inject(OrderService);
  private destroyRef = inject(DestroyRef);
  private pageNumber = this.orderService.getPageNumber();
  pageSize = this.orderService.getPageSize();
  currentElements = 0;
  orderList: QueryResult = this.orderService.findOrderSummaryList(this.authService.userId!);
  orderListStatus = toObservable(this.orderList.status);

  constructor() {
    this.currentElements = (this.pageNumber() * this.pageSize()) - this.pageSize();

    const subscription = this.orderListStatus.subscribe({
      next: orderListStatus => {

        if (orderListStatus === PENDING) {
          this.loadingAnimationService.startLoading();
        }

        if (orderListStatus === ERROR) {
          this.loadingAnimationService.stopLoading();
        }

        if (orderListStatus === SUCCESS) {
          this.loadingAnimationService.stopLoading();
          const response: ResponseDTO = this.orderList.data()!;
          if (response.status.error) {
            this.errorService.handleError(response);
          }
        }
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      this.loadingAnimationService.stopLoading();
      this.orderService.resetSummaryListArgs();
    });
  }

  onPageChange(event: PaginatorState) {
    const page = event.page === undefined ? 1 : event.page + 1;
    this.currentElements = event.first!;
    this.orderService.setPageNumber(page);
    this.orderService.setPageSize(event.rows!);
  }
}
