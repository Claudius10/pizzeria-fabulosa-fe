import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from "primeng/accordion";
import {Card} from "primeng/card";
import {PrimeTemplate} from "primeng/api";
import {StoreDTO} from '../../../interfaces/dto/resources';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-store-item',
  imports: [
    Card,
    PrimeTemplate,
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    TranslatePipe,
    NgOptimizedImage
  ],
  templateUrl: './store-item.component.html',
  styleUrl: './store-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreItemComponent implements OnInit {
  store = input<StoreDTO>();
  private translateService = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  currentLang = signal(this.translateService.currentLang);
  theStore = signal<StoreDTO>(storePlaceholder());

  ngOnInit(): void {
    const subscription = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
    });

    this.theStore.set(this.store()!);

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}

export const storePlaceholder = (): StoreDTO => {
  return {
    image: "assets",
    name: "...",
    schedule: {
      en: "...",
      es: "..."
    },
    phoneNumber: 0,
    address: {
      street: "...",
      number: 0,
      details: "...",
      id: 1
    },
    id: 1
  };
};
