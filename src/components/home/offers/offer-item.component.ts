import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {CardModule} from 'primeng/card';
import {OfferDTO} from '../../../interfaces/dto/resources';
import {AccordionModule} from 'primeng/accordion';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {NgOptimizedImage} from '@angular/common';

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
  offer = input<OfferDTO>();
  private translateService = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  currentLang = signal(this.translateService.currentLang);
  theOffer = signal<OfferDTO>(offerPlaceholder());

  ngOnInit(): void {
    const subscription = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
    });

    this.theOffer.set(this.offer()!);

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}

export const offerPlaceholder = (): OfferDTO => {
  return {
    image: "assets",
    name: {
      en: "...",
      es: "..."
    },
    description: {
      es: "...",
      en: "..."
    },
    caveat: {
      es: "...",
      en: "..."
    },
    id: 1
  };
};
