import {Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {CartItemDTO} from '../../../utils/interfaces/dto/order';
import {CartService} from '../../../services/cart/cart.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Button, ButtonDirective} from 'primeng/button';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {ThemeService} from '../../../services/theme/theme.service';

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
})
export class CartItemComponent implements OnInit {
  private translateService = inject(TranslateService);
  private themeService = inject(ThemeService);
  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);
  viewOnly = input.required<boolean>();
  item = input.required<CartItemDTO>();
  currentLang = signal(this.translateService.currentLang);
  isDarkMode = this.themeService.getDarkMode();
  viewIngredients = false;

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
    this.viewIngredients = !this.viewIngredients;
  }
}
