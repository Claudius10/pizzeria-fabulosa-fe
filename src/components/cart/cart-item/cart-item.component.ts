import {Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {CartItemDTO} from '../../../interfaces/dto/order';
import {CartService} from '../../../services/cart/cart.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Button, ButtonDirective} from 'primeng/button';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-cart-item',
  imports: [
    Button,
    ButtonDirective,
    NgClass,
    TranslatePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent implements OnInit {
  private cartService: CartService = inject(CartService);
  private translateService = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
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
}
