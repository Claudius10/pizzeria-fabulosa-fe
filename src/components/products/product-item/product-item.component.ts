import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {CartService} from '../../../services/cart/cart.service';

export type ProductDTO = {
  id: number;
  productType: string;
  image: string;
  name: string;
  description: string;
  price: number;
  format: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent {
  public product = input.required<ProductDTO>();
  private cartService = inject(CartService);

  public addProductToCart() {
    this.cartService.add({
      name: this.product().name,
      format: this.product().format,
      productType: this.product().productType,
      id: this.product().id,
      price: this.product().price,
      quantity: 1,
    });
  }
}
