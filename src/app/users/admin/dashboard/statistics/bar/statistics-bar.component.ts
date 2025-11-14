import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input, model, OnInit, signal} from '@angular/core';
import {ThemeService} from '../../../../../services/theme/theme.service';
import {toObservable} from '@angular/core/rxjs-interop';
import {Card} from 'primeng/card';
import {UIChart} from 'primeng/chart';
import {SelectButton} from 'primeng/selectbutton';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {merge} from 'rxjs';
import {OrderStatistics, OrderStatisticsByState} from '../../../../../../api/admin';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {DataLabel} from '../../../../../../utils/interfaces/label';

@Component({
  selector: 'app-statistics-bar',
  imports: [
    Card,
    UIChart,
    SelectButton,
    TranslatePipe,
    FormsModule
  ],
  templateUrl: './statistics-bar.component.html',
  styleUrl: './statistics-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
class StatisticsBarComponent implements OnInit {
  title = input.required<string>();
  timeLine = model.required<string>();
  queryKey = input.required<string[]>();
  dataLabels = input.required<DataLabel[]>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly themeService = inject(ThemeService);
  private readonly translateService = inject(TranslateService);
  private readonly queryClient = inject(QueryClient);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly isDarkMode = this.themeService.getDarkMode();
  private readonly lang = signal(this.translateService.currentLang);

  private readonly lang$ = toObservable(this.lang);
  private readonly darkMode$ = toObservable(this.isDarkMode);
  private readonly timeControl$ = toObservable(this.timeLine);

  private readonly chartInit$ = merge(this.timeControl$, this.darkMode$, this.lang$);

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
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    const ordersByState = this.queryClient.getQueryData(this.queryKey()) ?
      this.queryClient.getQueryData(this.queryKey()) as OrderStatistics : this.emptyData();

    const datasets = [];
    for (let i = 0; i < ordersByState.statisticsByState.length; i++) {

      const count = ordersByState.statisticsByState.at(i)!.count;
      const dataLabel = this.dataLabels().at(i)!;

      datasets.push({
        label: this.lang() === "en" ? dataLabel!.en : dataLabel!.es,
        data: count,
        backgroundColor: [documentStyle.getPropertyValue(dataLabel.color)],
        borderColor: [documentStyle.getPropertyValue(dataLabel.color)],
        borderWidth: 1,
      });
    }

    this.data = {
      labels: this.labels(this.lang()),
      datasets: datasets,
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

  private emptyData(): OrderStatistics {
    const completed: OrderStatisticsByState = {
      count: []
    };
    const cancelled: OrderStatisticsByState = {
      count: []
    };
    return {
      statisticsByState: [
        completed,
        cancelled
      ]
    };
  }
}

export default StatisticsBarComponent;
