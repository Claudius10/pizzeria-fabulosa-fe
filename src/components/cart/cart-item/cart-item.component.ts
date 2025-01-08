import {Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {CartItemDTO} from '../../../interfaces/dto/order';
import {CartService} from '../../../services/cart/cart.service';
import {TranslateService} from '@ngx-translate/core';
import {NgOptimizedImage} from '@angular/common';
import {Button, ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-cart-item',
  imports: [
    NgOptimizedImage,
    Button,
    ButtonDirective
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent implements OnInit {
  readOnly = input.required<boolean>();
  item = input.required<CartItemDTO>();
  private cartService: CartService = inject(CartService);
  private translateService = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  currentLang = signal(this.translateService.currentLang);

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
}
