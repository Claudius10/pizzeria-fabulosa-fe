import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AuthService} from '../../../../../services/auth/auth.service';
import {Paginator, PaginatorState} from 'primeng/paginator';
import {OrderService} from '../../../../../services/http/order/order.service';
import {QueryResult} from '../../../../../interfaces/query';
import {OrderSummaryComponent} from '../list-item/order-summary.component';
import {LoadingAnimationService} from '../../../../../services/animation/loading-animation.service';
import {toObservable} from '@angular/core/rxjs-interop';
import {ERROR, PENDING, SUCCESS} from '../../../../../utils/constants';
import {ErrorService} from '../../../../../services/error/error.service';
import {ServerErrorComponent} from '../../../../../app/routes/error/server-no-response/server-error.component';
import {ResponseDTO} from '../../../../../interfaces/http/api';
import {TranslatePipe} from '@ngx-translate/core';
import {NgForOf} from '@angular/common';
import {Skeleton} from 'primeng/skeleton';

const DEFAULT_PAGE_MAX_SIZE = 5;

@Component({
  selector: 'app-order-summary-list',
  imports: [
    ServerErrorComponent,
    OrderSummaryComponent,
    TranslatePipe,
    Paginator,
    NgForOf,
    Skeleton
  ],
  templateUrl: './order-summary-list.component.html',
  styleUrl: './order-summary-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryListComponent implements OnInit {
  private loadingAnimationService = inject(LoadingAnimationService);
  private orderService = inject(OrderService);
  private errorService = inject(ErrorService);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  protected first = 0;
  protected totalElements = 0;
  protected maxItems = DEFAULT_PAGE_MAX_SIZE;
  protected currentElements = DEFAULT_PAGE_MAX_SIZE;
  protected skeletonCount = DEFAULT_PAGE_MAX_SIZE;
  protected pageSizeOptions: number[] = [DEFAULT_PAGE_MAX_SIZE];
  orderList: QueryResult = this.orderService.findOrderSummaryList(this.authService.userId!);
  private orderListStatus = toObservable(this.orderList.status);

  ngOnInit() {
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

          if (response.status.error && response.error) {
            this.errorService.handleError(response.error);
          } else {
            this.totalElements = response.payload.totalElements;
            this.currentElements = response.payload.orderList.length;

            if (this.totalElements > DEFAULT_PAGE_MAX_SIZE && this.totalElements <= 10) {
              this.pageSizeOptions = [DEFAULT_PAGE_MAX_SIZE, 10];
            }

            if (this.totalElements > 10 && this.totalElements < 20) {
              this.pageSizeOptions = [DEFAULT_PAGE_MAX_SIZE, 10, 20];
            }

            if (this.totalElements > 20) {
              this.pageSizeOptions = [DEFAULT_PAGE_MAX_SIZE, 10, 20, 30];
            }
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
    this.first = event.first ?? 0;
    this.maxItems = event.rows ?? DEFAULT_PAGE_MAX_SIZE;

    this.skeletonCount = this.countSkeletons();
    this.orderService.setPageNumber(event.page === undefined ? 1 : event.page + 1);
    this.orderService.setPageSize(this.maxItems);
  }

  private countSkeletons() {
    if (this.maxItems > this.totalElements) {
      return this.totalElements;
    } else {
      return this.maxItems;
    }
  }
}
