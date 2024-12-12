import {Component, inject, input} from '@angular/core';
import {CartService} from '../../../services/cart/cart.service';
import {CartItemDTO} from '../../../interfaces/dto/order';
import {NgOptimizedImage} from '@angular/common';
import {Button, ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    NgOptimizedImage,
    Button,
    ButtonDirective
  ],
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  readOnly = input.required<boolean>();
  item = input.required<CartItemDTO>();
  private cartService: CartService = inject(CartService);

  decreaseItemQuantity(id: number) {
    this.cartService.decreaseQuantity(id);
  }

  increaseItemQuantity(id: number) {
    this.cartService.increaseQuantity(id);
  }
}
