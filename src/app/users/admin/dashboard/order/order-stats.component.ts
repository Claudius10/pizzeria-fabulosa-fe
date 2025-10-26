import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {ThemeService} from '../../../../services/theme/theme.service';
import {toObservable} from '@angular/core/rxjs-interop';
import {isPlatformBrowser} from '@angular/common';
import {Card} from 'primeng/card';
import {UIChart} from 'primeng/chart';
import {SelectButton} from 'primeng/selectbutton';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {lastValueFrom, merge} from 'rxjs';
import {OrderStatisticsAPIService, OrderStatisticsByState} from '../../../../../api/admin';
import {injectQuery, QueryClient} from '@tanstack/angular-query-experimental';
import {LoadingAnimationService} from '../../../../services/animation/loading-animation.service';
import {ErrorService} from '../../../../services/error/error.service';
import {ERROR, PENDING, SUCCESS} from '../../../../../utils/constants';
import {QueryResult} from '../../../../../utils/interfaces/query';

@Component({
  selector: 'app-order-stats',
  imports: [
    Card,
    UIChart,
    SelectButton,
    TranslatePipe,
    FormsModule
  ],
  templateUrl: './order-stats.component.html',
  styleUrl: './order-stats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
class OrderStatsComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly errorService = inject(ErrorService);
  private readonly themeService = inject(ThemeService);
  private readonly translateService = inject(TranslateService);
  private readonly queryClient = inject(QueryClient);
  private readonly loadingAnimationService = inject(LoadingAnimationService);
  private readonly orderStatisticsAPI = inject(OrderStatisticsAPIService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly isDarkMode = this.themeService.getDarkMode();
  private readonly lang = signal(this.translateService.currentLang);
  protected readonly timeLine = signal("hourly");
  private readonly darkMode$ = toObservable(this.isDarkMode);
  private readonly lang$ = toObservable(this.lang);
  private readonly timeControl$ = toObservable(this.timeLine);

  private readonly ordersCompleted: QueryResult<OrderStatisticsByState | undefined> = injectQuery(() => ({
    queryKey: ["admin", "order", "statistics", "byState", "completed", this.timeLine()],
    queryFn: () => lastValueFrom(this.orderStatisticsAPI.findCountForTimelineAndState(this.timeLine(), "COMPLETED")),

  }));
  private readonly ordersCompletedStatus$ = toObservable(this.ordersCompleted.status);

  private readonly ordersCanceled: QueryResult<OrderStatisticsByState | undefined> = injectQuery(() => ({
    queryKey: ["admin", "order", "statistics", "byState", "cancelled", this.timeLine()],
    queryFn: () => lastValueFrom(this.orderStatisticsAPI.findCountForTimelineAndState(this.timeLine(), "CANCELLED")),

  }));
  private readonly ordersCanceledStatus$ = toObservable(this.ordersCanceled.status);

  private readonly statsFetchStatus$ = merge(this.ordersCompletedStatus$, this.ordersCanceledStatus$);
  private readonly chartInit$ = merge(this.timeControl$, this.darkMode$, this.lang$);
  private readonly chart$ = merge(this.chartInit$, this.statsFetchStatus$);

  protected data: any;

  protected options: any;

  ngOnInit() {
    const languageChangeSubscription = this.translateService.onLangChange.subscribe((value) => {
      this.lang.set(value.lang);
    });

    const dataFetchSubscription = this.statsFetchStatus$.subscribe({
      next: status => {
        if (status === PENDING) {
          this.loadingAnimationService.startLoading();
        }

        if (status === ERROR) {
          this.loadingAnimationService.stopLoading();
          let completedErrors = this.ordersCompleted.error();
          let cancelledErrors = this.ordersCanceled.error();
          if (completedErrors) {
            this.errorService.handleError(completedErrors);
          } else if (cancelledErrors) {
            this.errorService.handleError(cancelledErrors);
          }
        }

        if (status === SUCCESS) {
          this.loadingAnimationService.stopLoading();
        }
      }
    });

    const chartSubscription = this.chart$.subscribe(() => {
      this.initChart();
    });

    this.destroyRef.onDestroy(() => {
      languageChangeSubscription.unsubscribe();
      dataFetchSubscription.unsubscribe();
      chartSubscription.unsubscribe();
    });
  }

  private initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      const ordersCompleted = this.queryClient.getQueryData(["admin", "order", "statistics", "byState", "completed", this.timeLine()]) ?
        this.queryClient.getQueryData(["admin", "order", "statistics", "byState", "completed", this.timeLine()]) as OrderStatisticsByState : this.emptyData();

      const ordersCancelled = this.queryClient.getQueryData(["admin", "order", "statistics", "byState", "cancelled", this.timeLine()]) ?
        this.queryClient.getQueryData(["admin", "order", "statistics", "byState", "cancelled", this.timeLine()]) as OrderStatisticsByState : this.emptyData();

      this.data = {
        labels: this.labels(this.lang()),
        datasets: [
          {
            label: this.lang() === "en" ? "Orders Completed" : "Pedidos Completados",
            data: ordersCompleted.countsByState,
            backgroundColor: [documentStyle.getPropertyValue('--p-green-500')],
            borderColor: [documentStyle.getPropertyValue('--p-green-500')],
            borderWidth: 1,
          },
          {
            label: this.lang() === "en" ? "Orders Cancelled" : "Pedidos Cancelados",
            data: ordersCancelled.countsByState,
            backgroundColor: [documentStyle.getPropertyValue('--p-amber-400')],
            borderColor: [documentStyle.getPropertyValue('--p-amber-400')],
            borderWidth: 1,
          },
        ],
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor,
              font: {
                size: 14,
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
    }

    this.changeDetectorRef.markForCheck();
  }

  protected timeLineOptions = [
    {
      label: "component.admin.nav.metrics.hourly",
      value: "hourly"
    },
    {
      label: "component.admin.nav.metrics.daily",
      value: "daily"
    },
    {
      label: "component.admin.nav.metrics.monthly",
      value: "monthly"
    },
    {
      label: "component.admin.nav.metrics.yearly",
      value: "yearly"
    }
  ];

  private readonly hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00"];
  private readonly daysEN = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  private readonly daysES = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  private readonly monthsEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private readonly monthsES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  private readonly years = ["2023", "2024", "2025"];

  private labels(locale: string): string[] {
    switch (this.timeLine()) {
      case "hourly":
        return this.hours;
      case "daily":
        return locale === "en" ? this.daysEN : this.daysES;
      case "monthly":
        return locale === "en" ? this.monthsEN : this.monthsES;
      case "yearly":
        return this.years;
      default:
        return this.hours;
    }
  }

  private emptyData(): OrderStatisticsByState {
    return {
      countsByState: []
    };
  }
}

export default OrderStatsComponent;
