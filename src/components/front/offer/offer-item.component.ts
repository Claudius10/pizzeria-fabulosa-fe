import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {CardModule} from 'primeng/card';
import {OfferDTO} from '../../../interfaces/dto/resources';
import {NgOptimizedImage} from '@angular/common';
import {AccordionModule} from 'primeng/accordion';

@Component({
  selector: 'app-offer-item',
  standalone: true,
  imports: [
    CardModule,
    NgOptimizedImage,
    AccordionModule
  ],
  templateUrl: './offer-item.component.html',
  styleUrl: './offer-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferItemComponent {
  offer = input.required<OfferDTO>();
}
