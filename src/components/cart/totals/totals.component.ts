import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Button} from "primeng/button";
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-cart-totals',
  standalone: true,
  imports: [
    Button,
    TranslatePipe
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
