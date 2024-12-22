import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ResourceService} from '../../services/http/resources/resource.service';
import {RESOURCE_OFFERS, RESOURCE_STORES} from '../../utils/query-keys';
import {toObservable} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';
import {LoadingAnimationService} from '../../services/navigation/loading-animation.service';
import {QueryResult} from '../../interfaces/query';
import {OfferItemComponent} from '../resources/offers/offer-item.component';
import {StoreItemComponent} from '../resources/stores/store-item.component';
import {ErrorService} from '../../services/error/error.service';
import {ServerErrorComponent} from '../app/error/server-no-response/server-error.component';
import {Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [
    OfferItemComponent,
    StoreItemComponent,
    ServerErrorComponent,
    TranslatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  private resourceService = inject(ResourceService);
  private loadingAnimationService = inject(LoadingAnimationService);
  private errorService = inject(ErrorService);
  private destroyRef = inject(DestroyRef);
  offers: QueryResult = this.resourceService.findOffers({queryKey: RESOURCE_OFFERS});
  stores: QueryResult = this.resourceService.findStores({queryKey: RESOURCE_STORES});
  offersStatus = toObservable(this.offers.status);
  storeStatus = toObservable(this.stores.status);
  status = merge(this.offersStatus, this.storeStatus);

  ngOnInit(): void {
    const subscription = this.status.pipe().subscribe({
      next: status => {
        if (status === "pending") {
          this.loadingAnimationService.startLoading();
        }

        if (status === "success" && this.offers.status() === "success" && this.stores.status() === "success") {
          this.loadingAnimationService.stopLoading();
        }

        if (status === "error") {
          this.loadingAnimationService.stopLoading();
          // did server respond?
          if (this.offers.data() !== undefined || this.stores.data() !== undefined) {
            // note: there are no non-fatal errors for offers/stores GET requests

            // offers error
            if (this.offers.data() !== undefined && this.offers.data()!.status.isError) {
              this.errorService.addError(this.offers.data()!.error!);
            }

            // stores error
            if (this.stores.data() !== undefined) {
              this.errorService.addError(this.stores.data()!.error!);
            }

            this.router.navigate(["/error"]);
          }
        }
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      this.loadingAnimationService.stopLoading();
    });
  }
}
