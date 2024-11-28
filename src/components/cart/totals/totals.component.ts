import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Button} from "primeng/button";

@Component({
  selector: 'app-cart-totals',
  standalone: true,
  imports: [
    Button
  ],
  templateUrl: './totals.component.html',
  styleUrl: './totals.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalsComponent {
  total = input.required<number>();
  threeForTwoOffers = input.required<number>();
  secondForHalfPriceOffer = input.required<number>();
  totalAfterOffers = input.required<number>();
}
