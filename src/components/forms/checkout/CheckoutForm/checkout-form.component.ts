import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {CheckoutFormService} from '../../../../services/checkout/checkout-form.service';
import {StepsModule} from 'primeng/steps';
import {CardModule} from 'primeng/card';
import {SmallScreenStepsComponent} from '../steps/small-screen/small-screen-steps.component';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {MenuItem} from 'primeng/api';
import {CartComponent} from '../../../cart/sidebar/cart.component';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-checkout-form',
    host: {
        class: 'upper-layout',
    },
  imports: [
    CardModule,
    StepsModule,
    SmallScreenStepsComponent,
    CartComponent,
    RouterOutlet
  ],
    templateUrl: './checkout-form.component.html',
    styleUrl: './checkout-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutFormComponent implements OnInit {
  protected checkoutFormService = inject(CheckoutFormService);
  private translateService = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  steps = signal<MenuItem[]>([
    {label: this.translateService.instant("form.step.one")},
    {label: this.translateService.instant("form.step.two")},
    {label: this.translateService.instant("form.step.three")},
    {label: this.translateService.instant("form.step.four")},
    {label: this.translateService.instant("form.step.five")},
  ]);

  ngOnInit(): void {
    const subscription = this.translateService.onLangChange.subscribe({
      next: (event: LangChangeEvent) => {
        this.steps.set([
            {label: event.translations["form.step.one"]},
            {label: event.translations["form.step.two"]},
            {label: event.translations["form.step.three"]},
            {label: event.translations["form.step.four"]},
            {label: event.translations["form.step.five"]},
          ]
        );
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
