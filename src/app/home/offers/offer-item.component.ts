import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {CardModule} from 'primeng/card';
import {AccordionModule} from 'primeng/accordion';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {NgOptimizedImage} from '@angular/common';
import {Offer} from '../../../api/public';

@Component({
  selector: 'app-offer-item',
  imports: [
    CardModule,
    AccordionModule,
    TranslatePipe,
    NgOptimizedImage
  ],
  templateUrl: './offer-item.component.html',
  styleUrl: './offer-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferItemComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly translateService = inject(TranslateService);
  protected readonly currentLang = signal(this.translateService.currentLang);
  readonly offer = input.required<Offer>();

  ngOnInit(): void {
    const subscription = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
