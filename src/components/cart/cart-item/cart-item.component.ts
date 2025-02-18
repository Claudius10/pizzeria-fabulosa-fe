import {Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {CartItemDTO} from '../../../interfaces/dto/order';
import {CartService} from '../../../services/cart/cart.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Button, ButtonDirective} from 'primeng/button';
import {NgClass} from '@angular/common';
import {LocalstorageService} from '../../../services/localstorage/localstorage.service';
import {animate, style, transition, trigger} from '@angular/animations';

const ANIMATION_TRANSITION_DURATION = "100ms";

@Component({
  selector: 'app-cart-item',
  imports: [
    Button,
    ButtonDirective,
    NgClass,
    TranslatePipe
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
  private localStorageService = inject(LocalstorageService);
  isDarkMode = signal(this.localStorageService.getDarkMode());
  readOnly = input.required<boolean>();
  item = input.required<CartItemDTO>();
  currentLang = signal(this.translateService.currentLang);
  viewIngredients = signal(false);

  ngOnInit(): void {
    const subscription = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
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

  getIcon() {
    switch (this.item().type) {
      case 'pizza':
        return this.isDarkMode() ? '/assets/icons/pizza-light.png' : '/assets/icons/pizza-dark.png';
      case 'beverage':
        return this.isDarkMode() ? '/assets/icons/beverage-light.png' : '/assets/icons/beverage-dark.png';
      default:
        return '';
    }
  }
}
