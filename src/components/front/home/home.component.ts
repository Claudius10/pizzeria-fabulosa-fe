import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ResourceService} from '../../../services/http/resources/resource.service';
import {RESOURCE_OFFERS, RESOURCE_STORES} from '../../../utils/query-keys';
import {CardModule} from 'primeng/card';
import {AccordionModule} from 'primeng/accordion';
import {OfferItemComponent} from '../offer/offer-item.component';
import {StoreItemComponent} from '../store/store-item.component';
import {toObservable} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';
import {LoadingAnimationService} from '../../../services/navigation/loading-animation.service';
import {QueryResult} from '../../../interfaces/query';

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
  private navigationService = inject(LoadingAnimationService);
  private destroyRef = inject(DestroyRef);
  offers: QueryResult = this.resourceService.findOffers({queryKey: RESOURCE_OFFERS});
  stores: QueryResult = this.resourceService.findStores({queryKey: RESOURCE_STORES});
  offersStatus = toObservable(this.offers.status);
  storeStatus = toObservable(this.stores.status);
  status = merge(this.offersStatus, this.storeStatus);

  ngOnInit(): void {
    const subscription = this.status.pipe().subscribe({
      next: status => {
        console.log(status);
        if (status === "pending") {
          this.navigationService.startLoading();
        }

        if (status === "success" && this.offers.status() === "success" && this.stores.status() === "success") {
          this.navigationService.stopLoading();
        }

        if (status === "error") {
          this.navigationService.stopLoading();
        }
      },
      complete: () => {
        this.navigationService.stopLoading();
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
