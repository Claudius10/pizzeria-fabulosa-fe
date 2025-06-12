import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {CartService} from '../../../services/cart/cart.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Button, ButtonDirective} from 'primeng/button';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {ThemeService} from '../../../services/theme/theme.service';
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
  viewOnly = input.required<boolean>();
  item = input.required<MyCartItemDTO>();
  viewIngredients = signal(false);
  private translateService = inject(TranslateService);
  currentLang = signal(this.translateService.currentLang);
  private themeService = inject(ThemeService);
  isDarkMode = this.themeService.getDarkMode();
  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const translateSub = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
    });

    this.destroyRef.onDestroy(() => {
      translateSub.unsubscribe();
    });
  }

  decreaseItemQuantity(id: string) {
    this.cartService.decreaseQuantity(id);
  }

  increaseItemQuantity(id: string) {
    this.cartService.increaseQuantity(id);
  }

  toggleIngredients() {
    this.viewIngredients.set(!this.viewIngredients());
  }
}
