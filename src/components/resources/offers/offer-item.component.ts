import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {CardModule} from 'primeng/card';
import {OfferDTO} from '../../../interfaces/dto/resources';
import {AccordionModule} from 'primeng/accordion';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-offer-item',
    imports: [
        CardModule,
        AccordionModule,
        TranslatePipe
    ],
    templateUrl: './offer-item.component.html',
    styleUrl: './offer-item.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferItemComponent implements OnInit {
  offer = input.required<OfferDTO>();
  private translateService = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  currentLang = signal(this.translateService.currentLang);

  ngOnInit(): void {
    const subscription = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
