import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Button} from "primeng/button";
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-cart-totals',
  imports: [
    Button,
    TranslatePipe
  ],
  templateUrl: './totals.component.html',
  styleUrl: './totals.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalsComponent {
  readonly total = input.required<number>();
  readonly threeForTwoOffers = input.required<number>();
  readonly secondForHalfPriceOffer = input.required<number>();
  readonly totalAfterOffers = input.required<number>();
}
