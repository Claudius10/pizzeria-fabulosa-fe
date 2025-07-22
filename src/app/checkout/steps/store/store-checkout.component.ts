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
  private readonly destroyRef = inject(DestroyRef);
  private readonly translateService = inject(TranslateService);
  protected readonly currentLang = signal(this.translateService.currentLang);
  readonly store = input.required<Store>();
  readonly orientation = input<"horizontal" | "vertical">('horizontal');
  readonly selected = input<string | null>(null);
  readonly highlight = input<boolean>();
  readonly invalid = input<boolean>();
  readonly onStoreSelect = output<string>();

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
