import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {AccordionModule} from "primeng/accordion";
import {CardModule} from "primeng/card";
import {PrimeTemplate} from "primeng/api";
import {StoreDTO} from '../../../interfaces/dto/resources';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-store-item',
  standalone: true,
  imports: [
    AccordionModule,
    CardModule,
    PrimeTemplate,
    TranslatePipe
  ],
  templateUrl: './store-item.component.html',
  styleUrl: './store-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreItemComponent implements OnInit {
  store = input.required<StoreDTO>();
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
