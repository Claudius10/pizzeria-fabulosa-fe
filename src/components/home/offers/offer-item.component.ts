import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {CardModule} from 'primeng/card';
import {AccordionModule} from 'primeng/accordion';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {NgOptimizedImage} from '@angular/common';
import {Offer} from '../../../api/asset';

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
  offer = input.required<Offer>();
  private translateService = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  protected currentLang = signal(this.translateService.currentLang);

  ngOnInit(): void {
    const subscription = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
