import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {CartService} from '../../../../services/cart/cart.service';
import {Button} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {ProductDTO} from '../../../../interfaces/dto/resources';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgOptimizedImage,
    Button,
    CardModule,
    PanelModule,
    NgClass
  ],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
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
      image: this.product().image,
    });
  }
}
