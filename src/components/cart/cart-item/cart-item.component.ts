import {Component, inject, input} from '@angular/core';
import {CartService} from '../../../services/cart/cart.service';
import {OrderItemDTO} from '../../../interfaces/dto/order';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  public item = input.required<OrderItemDTO>();
  private cartService: CartService = inject(CartService);

  decreaseItemQuantity(id: number) {
    this.cartService.decreaseQuantity(id);
  }

  increaseItemQuantity(id: number) {
    this.cartService.increaseQuantity(id);
  }
}
