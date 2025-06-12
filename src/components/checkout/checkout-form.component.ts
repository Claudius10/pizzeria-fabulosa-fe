import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CheckoutFormService} from '../../services/checkout/checkout-form.service';
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
  protected checkoutFormService = inject(CheckoutFormService);
  private translateService = inject(TranslateService);
  steps = [
    {label: this.translateService.instant("form.step.one")},
    {label: this.translateService.instant("form.step.two")},
    {label: this.translateService.instant("form.step.three")},
    {label: this.translateService.instant("form.step.four")},
    {label: this.translateService.instant("form.step.five")},
  ];
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.translateService.onLangChange.subscribe({
      next: (event: LangChangeEvent) => {
        this.steps = [
          {label: event.translations["form.step.one"]},
          {label: event.translations["form.step.two"]},
          {label: event.translations["form.step.three"]},
          {label: event.translations["form.step.four"]},
          {label: event.translations["form.step.five"]},
        ];
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
