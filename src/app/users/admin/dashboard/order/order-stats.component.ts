import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {ThemeService} from '../../../../services/theme/theme.service';
import {toObservable} from '@angular/core/rxjs-interop';
import {isPlatformBrowser} from '@angular/common';
import {Card} from 'primeng/card';
import {UIChart} from 'primeng/chart';
import {SelectButton} from 'primeng/selectbutton';
import {TranslatePipe} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {merge} from 'rxjs';

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
export class OrderStatsComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly themeService = inject(ThemeService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isDarkMode = this.themeService.getDarkMode();
  protected readonly timeLineControl = signal("H");
  private readonly timeControl$ = toObservable(this.timeLineControl);
  private readonly darkMode$ = toObservable(this.isDarkMode);
  private readonly chart$ = merge(this.timeControl$, this.darkMode$);

  protected timeLineOptions = [
    {
      label: "Hourly",
      value: "Hourly"
    },
    {
      label: "Daily",
      value: "Daily"
    },
    {
      label: "Monthly",
      value: "Monthly"
    },
    {
      label: "Yearly",
      value: "Yearly"
    }
  ];

  protected data: any; // TODO - populate with data from back-end

  protected options: any;

  // TODO - replaces values with tokens for localization
  private readonly years = ["2020", "2021", "2022", "2023", "2024", "2025"];
  private readonly months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private readonly days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  private readonly hours = ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00"];

  ngOnInit() {
    this.initChart();

    const subscription = this.chart$.subscribe(() => {
      // TODO - fetch data with admin resource server API when timeControl$ emits
      this.initChart();
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  private initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.data = {
        labels: this.labels(),
        datasets: [
          {
            label: 'Orders Completed',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-green-500'),
            tension: 0.4,
          },
          {
            label: 'Orders Cancelled',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-amber-400'),
            tension: 0.4
          }
        ]
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
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          }
        }
      };
    }

    this.changeDetectorRef.markForCheck();
  }

  private labels(): string[] {
    switch (this.timeLineControl()) {
      case "Hourly":
        return this.hours;
      case "Daily":
        return this.days;
      case "Monthly":
        return this.months;
      case "Yearly":
        return this.years;
      default:
        return this.hours;
    }
  }
}
