import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal} from '@angular/core';
import StatisticsBarComponent from './statistics/bar/statistics-bar.component';
import {ErrorService} from '../../../services/error/error.service';
import {LoadingAnimationService} from '../../../services/animation/loading-animation.service';
import {OrderStatistics, OrderStatisticsAPIService} from '../../../../api/admin';
import {QueryResult} from '../../../../utils/interfaces/query';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {lastValueFrom, merge} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {ERROR, PENDING, SUCCESS} from '../../../../utils/constants';
import {ServerErrorComponent} from '../../../routes/error/server-no-response/server-error.component';
import {Skeleton} from 'primeng/skeleton';
import {ordersByAnonymousLabels, ordersByRegisteredLabels, ordersCancelledLabels, ordersCompletedLabels} from '../../../../utils/data-labels';
import StatisticsDoughnutComponent from './statistics/doughnut/statistics-doughnut.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    StatisticsBarComponent,
    ServerErrorComponent,
    Skeleton,
    StatisticsDoughnutComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly errorService = inject(ErrorService);
  private readonly loadingAnimationService = inject(LoadingAnimationService);
  private readonly orderStatisticsAPI = inject(OrderStatisticsAPIService);

  protected readonly timeLineByOrderState = signal<"hourly" | "daily" | "monthly" | "yearly">("hourly");
  protected readonly timeLineByUserState = signal<"hourly" | "daily" | "monthly" | "yearly">("hourly");

  protected readonly byOrderStateQueryKey = computed(() => ["admin", "order", "statistics", "byOrderState", this.timeLineByOrderState()]);
  protected readonly byUserStateQueryKey = computed(() => ["admin", "order", "statistics", "byUserState", this.timeLineByUserState()]);
  protected readonly byUserStateAllQueryKey = ["admin", "order", "statistics", "byUserState", "all"];

  protected readonly headerByOrderState: string = "component.admin.nav.metrics.order.state";
  protected readonly headerByUserState: string = "component.admin.nav.metrics.user.state";

  protected readonly orderStatisticsByOrderState: QueryResult<OrderStatistics | undefined> = injectQuery(() => ({
    queryKey: this.byOrderStateQueryKey(),
    queryFn: () => lastValueFrom(this.orderStatisticsAPI.findCountByOrderState(this.timeLineByOrderState())),
  }));
  private readonly ordersByStateStatus$ = toObservable(this.orderStatisticsByOrderState.status);

  protected readonly orderStatisticsByUserState: QueryResult<OrderStatistics | undefined> = injectQuery(() => ({
    queryKey: this.byUserStateQueryKey(),
    queryFn: () => lastValueFrom(this.orderStatisticsAPI.findCountByUserState(this.timeLineByUserState())),
  }));
  private readonly orderByUserStateStatus$ = toObservable(this.orderStatisticsByUserState.status);

  protected readonly orderStatisticsByUserStateAll: QueryResult<OrderStatistics | undefined> = injectQuery(() => ({
    queryKey: this.byUserStateAllQueryKey,
    queryFn: () => lastValueFrom(this.orderStatisticsAPI.findCountByUserState("all")),
  }));
  private readonly orderByUserStateAllStatus$ = toObservable(this.orderStatisticsByUserStateAll.status);

  private readonly fetchStatus$ = merge(this.ordersByStateStatus$, this.orderByUserStateStatus$, this.orderByUserStateAllStatus$);

  ngOnInit() {
    const dataFetchSubscription = this.fetchStatus$.subscribe({
      next: status => {
        if (status === PENDING) {
          this.loadingAnimationService.startLoading();
        }

        if (status === ERROR) {
          this.loadingAnimationService.stopLoading();
          const byOrderStateErrors = this.orderStatisticsByOrderState.error();
          const byUserStateErrors = this.orderStatisticsByUserState.error();
          if (byOrderStateErrors) {
            this.errorService.handleError(byOrderStateErrors);
          } else if (byUserStateErrors) {
            this.errorService.handleError(byUserStateErrors);
          }
        }

        if (status === SUCCESS) {
          this.loadingAnimationService.stopLoading();
        }
      }
    });

    this.destroyRef.onDestroy(() => {
      dataFetchSubscription.unsubscribe();
    });
  }

  protected readonly ordersCompletedLabels = ordersCompletedLabels;
  protected readonly ordersCancelledLabels = ordersCancelledLabels;
  protected readonly ordersByRegisteredLabels = ordersByRegisteredLabels;
  protected readonly ordersByAnonymousLabels = ordersByAnonymousLabels;
}
