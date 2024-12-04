import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {AccordionModule} from "primeng/accordion";
import {CardModule} from "primeng/card";
import {StoreDTO} from '../../../../interfaces/dto/resources';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-store-checkout',
  standalone: true,
  imports: [
    AccordionModule,
    CardModule,
    NgClass
  ],
  templateUrl: './store-checkout.component.html',
  styleUrl: './store-checkout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreCheckoutComponent {
  store = input.required<StoreDTO>();
  storeId = output<number>();
  selected = input<number | null>(null);

  selectStore() {
    this.storeId.emit(this.store().id);
  }
}
