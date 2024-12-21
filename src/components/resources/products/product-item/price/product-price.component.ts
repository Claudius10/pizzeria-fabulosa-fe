import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-product-price',
  standalone: true,
  imports: [
    Button
  ],
  templateUrl: './product-price.component.html',
  styleUrl: './product-price.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPriceComponent {
  price = input.required<number>();

}
