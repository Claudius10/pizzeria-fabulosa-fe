import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, output, signal} from '@angular/core';
import {AccordionModule} from "primeng/accordion";
import {CardModule} from "primeng/card";
import {StoreDTO} from '../../../../../../interfaces/dto/resources';
import {NgClass} from '@angular/common';
import {AddressId} from '../../../../../../services/forms/checkout/checkout-form.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-store-checkout',
  standalone: true,
  imports: [
    AccordionModule,
    CardModule,
    NgClass
  ],
  templateUrl: './store-checkout.component.html',
  styleUrl: './store-checkout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreCheckoutComponent implements OnInit {
  onStoreSelect = output<AddressId>();
  private translateService = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  orientation = input<"horizontal" | "vertical">('horizontal');
  store = input.required<StoreDTO>();
  selected = input<number | null>(null);
  valid = input<boolean>();
  currentLang = signal(this.translateService.currentLang);

  ngOnInit(): void {
    const subscription = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  selectStore() {
    this.onStoreSelect.emit({id: this.store().id, isStore: true});
  }
}
