import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-product-price',
  imports: [
    Button
  ],
  templateUrl: './product-price.component.html',
  styleUrl: './product-price.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPriceComponent {
  readonly price = input.required<number>();
}
