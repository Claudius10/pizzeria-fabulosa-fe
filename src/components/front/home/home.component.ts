import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ResourceService} from '../../../services/http/resources/resource.service';
import {RESOURCE_OFFERS, RESOURCE_STORES} from '../../../utils/query-keys';
import {OffersQueryResult, StoresQueryResult} from '../../../interfaces/query';
import {CardModule} from 'primeng/card';
import {AccordionModule} from 'primeng/accordion';
import {OfferItemComponent} from '../offer/offer-item.component';
import {StoreItemComponent} from '../store/store-item.component';
import {toObservable} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';
import {NavigationService} from '../../../services/navigation/navigation.service';

@Component({
  selector: 'app-home',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [
    CardModule,
    AccordionModule,
    OfferItemComponent,
    StoreItemComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private resourceService = inject(ResourceService);
  private navigationService = inject(NavigationService);
  private destroyRef = inject(DestroyRef);
  offers: OffersQueryResult = this.resourceService.findOffers({queryKey: RESOURCE_OFFERS});
  stores: StoresQueryResult = this.resourceService.findStores({queryKey: RESOURCE_STORES});
  offersStatus = toObservable(this.offers.status);
  storeStatus = toObservable(this.stores.status);
  status = merge(this.offersStatus, this.storeStatus);

  ngOnInit(): void {
    const subscription = this.status.pipe().subscribe({
      next: status => {
        console.log(status);
        if (status === "pending") {
          this.navigationService.setIsLoading(true);
        }

        if (status === "success" && this.offers.status() === "success" && this.stores.status() === "success") {
          this.navigationService.setIsLoading(false);
        }

        if (status === "error") {
          this.navigationService.setIsLoading(false);
        }
      },
      complete: () => {
        this.navigationService.setIsLoading(false);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
