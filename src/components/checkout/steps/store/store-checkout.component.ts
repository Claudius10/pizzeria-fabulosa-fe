import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, output, signal} from '@angular/core';
import {StoreDTO} from '../../../../interfaces/dto/resources';
import {NgClass} from '@angular/common';
import {AddressId} from '../../../../services/checkout/checkout-form.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-store-checkout',
  imports: [
    NgClass
  ],
  templateUrl: './store-checkout.component.html',
  styleUrl: './store-checkout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreCheckoutComponent implements OnInit {
  store = input.required<StoreDTO>();
  onStoreSelect = output<AddressId>();
  private translateService = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  orientation = input<"horizontal" | "vertical">('horizontal');
  currentLang = signal(this.translateService.currentLang);
  selected = input<number | null>(null);
  highlight = input<boolean>();
  valid = input<boolean>();

  ngOnInit(): void {
    const subscription = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  selectStore() {
    this.onStoreSelect.emit({id: this.store().address.id, isStore: true});
  }
}
