import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ResourceService} from '../../../services/http/resources/resource.service';
import {RESOURCE_OFFERS, RESOURCE_STORES} from '../../../utils/query-keys';
import {OffersQueryResult, StoresQueryResult} from '../../../interfaces/query';
import {CardModule} from 'primeng/card';
import {NgOptimizedImage} from '@angular/common';
import {AccordionModule} from 'primeng/accordion';
import {OfferItemComponent} from '../offer/offer-item.component';
import {StoreItemComponent} from '../store/store-item.component';

@Component({
  selector: 'app-home',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [
    CardModule,
    NgOptimizedImage,
    AccordionModule,
    OfferItemComponent,
    StoreItemComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private resourceService = inject(ResourceService);
  offers: OffersQueryResult = this.resourceService.findOffers({queryKey: RESOURCE_OFFERS});
  stores: StoresQueryResult = this.resourceService.findStores({queryKey: RESOURCE_STORES});
}
