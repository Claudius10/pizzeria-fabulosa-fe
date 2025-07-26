import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {Paginator, PaginatorState} from 'primeng/paginator';
import {OrderSummaryComponent} from '../list-item/order-summary.component';
import {LoadingAnimationService} from '../../../../services/animation/loading-animation.service';
import {ErrorService} from '../../../../services/error/error.service';
import {ServerErrorComponent} from '../../../../routes/error/server-no-response/server-error.component';
import {TranslatePipe} from '@ngx-translate/core';
import {isPlatformBrowser} from '@angular/common';
import {Skeleton} from 'primeng/skeleton';
import {toObservable} from '@angular/core/rxjs-interop';
import {ERROR, PENDING, SUCCESS} from '../../../../../utils/constants';
import {ActivatedRoute, Router} from '@angular/router';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {tempQueryResult, tempStatus$} from '../../../../../utils/placeholder';
import {USER_ORDER_SUMMARY_LIST} from '../../../../../utils/query-keys';
import {AuthService} from '../../../../services/auth/auth.service';
import {QueryResult} from '../../../../../utils/interfaces/query';
import {OrderSummaryListDTO, UserOrdersAPIService} from '../../../../../api/business';

const DEFAULT_PAGE_MAX_SIZE = 5;

@Component({
  selector: 'app-order-summary-list',
  imports: [
    ServerErrorComponent,
    OrderSummaryComponent,
    TranslatePipe,
    Paginator,
    Skeleton
  ],
  templateUrl: './order-summary-list.component.html',
  styleUrl: './order-summary-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryListComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isServer = !isPlatformBrowser(this.platformId);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly loadingAnimationService = inject(LoadingAnimationService);
  private readonly errorService = inject(ErrorService);
  private readonly authService = inject(AuthService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly userOrdersAPI = inject(UserOrdersAPIService);
  private readonly userId = this.authService.getId();
  private readonly page = signal(this.activatedRoute.snapshot.queryParamMap.get("page") === null ? 1 : Number(this.activatedRoute.snapshot.queryParamMap.get("page")!));

  protected readonly orderList: QueryResult<OrderSummaryListDTO | undefined> = !this.isServer ? injectQuery(() => ({
    queryKey: [...USER_ORDER_SUMMARY_LIST, this.page()],
    queryFn: () => {
      return lastValueFrom(this.userOrdersAPI.findSummary(this.page() - 1, DEFAULT_PAGE_MAX_SIZE, this.userId()!));
    },
  })) : tempQueryResult();

  private readonly orderListStatus = !this.isServer ? toObservable(this.orderList.status) : tempStatus$();

  protected readonly first = signal(0);
  protected readonly totalElements = signal(0);

  ngOnInit() {
    this.first.set((this.page() - 1) * DEFAULT_PAGE_MAX_SIZE);

    const subscription = this.orderListStatus.subscribe({
      next: orderListStatus => {
        if (orderListStatus === PENDING) {
          this.loadingAnimationService.startLoading();
        }

        if (orderListStatus === ERROR) {
          this.loadingAnimationService.stopLoading();
          this.errorService.handleError(this.orderList.error()!);
        }

        if (orderListStatus === SUCCESS) {
          this.loadingAnimationService.stopLoading();
          const response: OrderSummaryListDTO = this.orderList.data()!;
          // if list is empty the return is 204 without a body
          if (response) {
            this.totalElements.set(response.totalElements);
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
    this.first.set(event.first ?? 0);
    const page = event.page === undefined ? 1 : event.page + 1;
    this.page.set(page);
    this.router.navigate(["user/orders"], {queryParams: {page: page}});
  }
}
