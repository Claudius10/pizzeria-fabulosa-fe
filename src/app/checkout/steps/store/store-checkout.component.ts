import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, output, signal} from '@angular/core';
import {NgClass} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '../../../../api/public';

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
  private destroyRef = inject(DestroyRef);
  private translateService = inject(TranslateService);
  protected currentLang = signal(this.translateService.currentLang);
  store = input.required<Store>();
  orientation = input<"horizontal" | "vertical">('horizontal');
  selected = input<string | null>(null);
  highlight = input<boolean>();
  invalid = input<boolean>();
  onStoreSelect = output<string>();

  ngOnInit(): void {
    const subscription = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  protected selectStore() {
    this.onStoreSelect.emit(this.store().address!);
  }
}
