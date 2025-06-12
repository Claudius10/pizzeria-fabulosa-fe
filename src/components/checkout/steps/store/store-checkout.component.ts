import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, output, signal} from '@angular/core';
import {NgClass} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '../../../../api/asset';
import {Address} from '../../../../services/checkout/checkout-form.service';

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
  store = input.required<Store>();
  orientation = input<"horizontal" | "vertical">('horizontal');
  selected = input<string | null>(null);
  highlight = input<boolean>();
  invalid = input<boolean>();
  onStoreSelect = output<Address>();
  private translateService = inject(TranslateService);
  protected currentLang = signal(this.translateService.currentLang);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  protected selectStore() {
    this.onStoreSelect.emit({name: this.store().address!, isStore: true});
  }
}
