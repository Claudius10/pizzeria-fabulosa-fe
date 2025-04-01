import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, output, signal} from '@angular/core';
import {StoreDTO} from '../../../../utils/interfaces/dto/resources';
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
  orientation = input<"horizontal" | "vertical">('horizontal');
  selected = input<number | null>(null);
  highlight = input<boolean>();
  store = input.required<StoreDTO>();
  invalid = input<boolean>();
  onStoreSelect = output<AddressId>();
  private translateService = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  protected currentLang = signal(this.translateService.currentLang);

  ngOnInit(): void {
    const subscription = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  protected selectStore() {
    this.onStoreSelect.emit({id: this.store().address.id, isStore: true});
  }
}
