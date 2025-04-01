import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {Paginator, PaginatorState} from 'primeng/paginator';
import {OrderSummaryComponent} from '../list-item/order-summary.component';
import {LoadingAnimationService} from '../../../../../services/animation/loading-animation.service';
import {ErrorService} from '../../../../../services/error/error.service';
import {ServerErrorComponent} from '../../../../../app/routes/error/server-no-response/server-error.component';
import {TranslatePipe} from '@ngx-translate/core';
import {isPlatformBrowser, NgForOf} from '@angular/common';
import {Skeleton} from 'primeng/skeleton';
import {toObservable} from '@angular/core/rxjs-interop';
import {QueryResult} from '../../../../../utils/interfaces/query';
import {ERROR, PENDING, SUCCESS} from '../../../../../utils/constants';
import {ResponseDTO} from '../../../../../utils/interfaces/http/api';
import {ActivatedRoute, Router} from '@angular/router';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {OrderHttpService} from '../../../../../services/http/order/order-http.service';
import {tempQueryResult, tempStatus$} from '../../../../../utils/placeholder';
import {USER_ORDER_SUMMARY_LIST} from '../../../../../utils/query-keys';

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
  private platformId = inject(PLATFORM_ID);
  private isServer = !isPlatformBrowser(this.platformId);
  private loadingAnimationService = inject(LoadingAnimationService);
  private orderHttpService = inject(OrderHttpService);
  private activatedRoute = inject(ActivatedRoute);
  private errorService = inject(ErrorService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  protected first = 0;
  protected totalElements = 0;
  private page = signal(this.activatedRoute.snapshot.queryParamMap.get("page") === null ? 1 : Number(this.activatedRoute.snapshot.queryParamMap.get("page")!));
  protected orderList: QueryResult = !this.isServer ? injectQuery(() => ({
    queryKey: [...USER_ORDER_SUMMARY_LIST, this.page()],
    queryFn: () => {
      return lastValueFrom(this.orderHttpService.findOrderSummaryList(this.page() - 1));
    },
  })) : tempQueryResult();
  private orderListStatus = !this.isServer ? toObservable(this.orderList.status) : tempStatus$();

  ngOnInit() {
    this.first = (this.page() - 1) * 5;

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
          }
        }
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      this.loadingAnimationService.stopLoading();
    });
  }

  protected onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    const page = event.page === undefined ? 1 : event.page + 1;
    this.page.set(page);
    this.router.navigate(["user/orders"], {queryParams: {page: page}});
  }
}
