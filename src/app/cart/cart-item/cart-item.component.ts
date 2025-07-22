import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {CartService} from '../../services/cart/cart.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Button, ButtonDirective} from 'primeng/button';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {ThemeService} from '../../services/theme/theme.service';
import {MyCartItemDTO} from '../../../utils/interfaces/MyCartItemDTO';

@Component({
  selector: 'app-cart-item',
  imports: [
    Button,
    ButtonDirective,
    NgClass,
    TranslatePipe,
    NgOptimizedImage
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent implements OnInit {
  private readonly translateService = inject(TranslateService);
  private readonly themeService = inject(ThemeService);
  private readonly cartService = inject(CartService);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly currentLang = signal(this.translateService.currentLang);
  protected readonly viewIngredients = signal(false);
  protected readonly isDarkMode = this.themeService.getDarkMode();
  readonly viewOnly = input.required<boolean>();
  readonly item = input.required<MyCartItemDTO>();

  ngOnInit(): void {
    const translateSub = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
    });

    this.destroyRef.onDestroy(() => {
      translateSub.unsubscribe();
    });
  }

  protected decreaseItemQuantity(id: string) {
    this.cartService.decreaseQuantity(id);
  }

  protected increaseItemQuantity(id: string) {
    this.cartService.increaseQuantity(id);
  }

  protected toggleIngredients() {
    this.viewIngredients.set(!this.viewIngredients());
  }
}
