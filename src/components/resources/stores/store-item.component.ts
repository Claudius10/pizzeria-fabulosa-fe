import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {AccordionModule} from "primeng/accordion";
import {CardModule} from "primeng/card";
import {NgOptimizedImage} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {StoreDTO} from '../../../interfaces/dto/resources';

@Component({
  selector: 'app-store-item',
  standalone: true,
  imports: [
    AccordionModule,
    CardModule,
    NgOptimizedImage,
    PrimeTemplate
  ],
  templateUrl: './store-item.component.html',
  styleUrl: './store-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreItemComponent {
  store = input.required<StoreDTO>();
}
