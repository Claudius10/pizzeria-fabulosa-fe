import {Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {CartItemDTO} from '../../../interfaces/dto/order';
import {CartService} from '../../../services/cart/cart.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Button, ButtonDirective} from 'primeng/button';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {animate, style, transition, trigger} from '@angular/animations';
import {ThemeService} from '../../../services/theme/theme.service';
import {toObservable} from '@angular/core/rxjs-interop';

const ANIMATION_TRANSITION_DURATION = "100ms";

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
  animations: [
    trigger('ingredientsAnimation', [
      transition(':enter', [style({
        height: "0px",
        overflow: "hidden"
      }), animate(ANIMATION_TRANSITION_DURATION, style({height: "*"}))]),
      transition(':leave', [animate(ANIMATION_TRANSITION_DURATION, style({height: '0px', overflow: "hidden"}))]),
    ]),
  ]
})
export class CartItemComponent implements OnInit {
  private cartService: CartService = inject(CartService);
  private translateService = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  private themeService = inject(ThemeService);
  readOnly = input.required<boolean>();
  item = input.required<CartItemDTO>();
  currentLang = signal(this.translateService.currentLang);
  viewIngredients = signal(false);
  isDarkMode = toObservable(this.themeService.isDarkMode);
  icon = signal("");

  ngOnInit(): void {
    const subscription = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
    });

    this.isDarkMode.subscribe(isDarkMode => {
      this.icon.set(this.getIcon(isDarkMode));
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
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

  getIcon(isDarkMode: boolean) {
    if (isDarkMode) {
      return this.getLightIcon();
    } else {
      return this.getDarkIcon();
    }
  }

  getLightIcon() {
    switch (this.item().type) {
      case 'pizza':
        return '/assets/icons/pizza-light.png';
      case 'beverage':
        return '/assets/icons/beverage-light.png';
      default:
        return '';
    }
  }

  getDarkIcon() {
    switch (this.item().type) {
      case 'pizza':
        return '/assets/icons/pizza-dark.png';
      case 'beverage':
        return '/assets/icons/beverage-dark.png';
      default:
        return '';
    }
  }
}
