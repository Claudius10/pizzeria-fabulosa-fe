import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {CheckoutFormService} from '../services/checkout/checkout-form.service';
import {Steps} from 'primeng/steps';
import {Card} from 'primeng/card';
import {SmallScreenStepsComponent} from './steps/small-screen/small-screen-steps.component';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {CartComponent} from '../cart/cart.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-checkout-form',
  host: {
    class: 'upper-layout',
  },
  imports: [
    Card,
    Steps,
    SmallScreenStepsComponent,
    RouterOutlet,
    CartComponent
  ],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutFormComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly checkoutFormService = inject(CheckoutFormService);
  private readonly translateService = inject(TranslateService);
  protected readonly step = this.checkoutFormService.getStep();
  protected readonly steps = signal([
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
        ]);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
