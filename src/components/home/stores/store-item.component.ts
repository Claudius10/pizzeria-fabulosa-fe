import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from "primeng/accordion";
import {Card} from "primeng/card";
import {PrimeTemplate} from "primeng/api";
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {NgOptimizedImage} from '@angular/common';
import {Store} from '../../../api/public';

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
  store = input.required<Store>();
  private translateService = inject(TranslateService);
  protected currentLang = signal(this.translateService.currentLang);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
