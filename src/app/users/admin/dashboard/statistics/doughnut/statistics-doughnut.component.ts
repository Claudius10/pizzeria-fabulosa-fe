import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {ThemeService} from '../../../../../services/theme/theme.service';
import {toObservable} from '@angular/core/rxjs-interop';
import {Card} from 'primeng/card';
import {UIChart} from 'primeng/chart';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {merge} from 'rxjs';
import {OrderStatistics, OrderStatisticsByState} from '../../../../../../api/admin';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {DataLabel} from '../../../../../../utils/interfaces/label';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-statistics-doughnut',
  imports: [
    Card,
    UIChart,
    TranslatePipe,
    FormsModule
  ],
  templateUrl: './statistics-doughnut.component.html',
  styleUrl: './statistics-doughnut.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
class StatisticsDoughnutComponent implements OnInit {
  header = input.required<string>();
  queryKey = input.required<string[]>();
  dataLabels = input.required<DataLabel[]>();

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly themeService = inject(ThemeService);
  private readonly translateService = inject(TranslateService);
  private readonly queryClient = inject(QueryClient);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly isDarkMode = this.themeService.getDarkMode();
  private readonly lang = signal(this.translateService.currentLang);

  private readonly lang$ = toObservable(this.lang);
  private readonly darkMode$ = toObservable(this.isDarkMode);

  private readonly chartInit$ = merge(this.darkMode$, this.lang$);

  protected data: any;
  protected options: any;

  ngOnInit() {
    const languageChangeSubscription = this.translateService.onLangChange.subscribe((value) => {
      this.lang.set(value.lang);
    });

    const chartSubscription = this.chartInit$.subscribe(() => {
      this.initChart();
    });

    this.destroyRef.onDestroy(() => {
      languageChangeSubscription.unsubscribe();
      chartSubscription.unsubscribe();
    });
  }

  private initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');

      const ordersByState = this.queryClient.getQueryData(this.queryKey()) ?
        this.queryClient.getQueryData(this.queryKey()) as OrderStatistics : this.emptyData();

      const labels = [];
      const data = [];
      const backgroundColor = [];
      const borderColor = [];

      for (let i = 0; i < ordersByState.statisticsByState.length; i++) {
        this.lang() === "en" ? labels.push(this.dataLabels()[i]!.en) : labels.push(this.dataLabels()[i]!.es);
        data.push(ordersByState.statisticsByState.at(i)!.count);
        backgroundColor.push(documentStyle.getPropertyValue(this.dataLabels()[i].color));
        borderColor.push(documentStyle.getPropertyValue(this.dataLabels()[i].color));
      }

      this.data = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
          }
        ],
      };

      this.options = {
        animation: {
          animateScale: true,
        },
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        }
      };

      this.changeDetectorRef.markForCheck();
    }
  }

  private emptyData(): OrderStatistics {
    const empty: OrderStatisticsByState = {
      count: []
    };
    return {
      statisticsByState: [empty]
    };
  }
}

export default StatisticsDoughnutComponent;
