import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {RESOURCE_OFFERS} from '../../utils/query-keys';
import {toObservable} from '@angular/core/rxjs-interop';
import {firstValueFrom, merge} from 'rxjs';
import {LoadingAnimationService} from '../../services/animation/loading-animation.service';
import {QueryResult} from '../../utils/interfaces/query';
import {OfferItemComponent} from './offers/offer-item.component';
import {StoreItemComponent} from './stores/store-item.component';
import {ErrorService} from '../../services/error/error.service';
import {ServerErrorComponent} from '../../app/routes/error/server-no-response/server-error.component';
import {ResponseDTO} from '../../utils/interfaces/http/api';
import {ERROR, PENDING, SUCCESS} from '../../utils/constants';
import {TranslatePipe} from '@ngx-translate/core';
import {Skeleton} from "primeng/skeleton";
import {injectQuery} from '@tanstack/angular-query-experimental';
import {ResourcesHttpService} from '../../services/http/resources/resources-http.service';
import {RESOURCE_STORE} from '../../utils/api-routes';
import {isPlatformBrowser} from '@angular/common';
import {tempQueryResult, tempStatus$} from '../../utils/placeholder';

@Component({
  selector: 'app-home',
  host: {
    class: 'upper-layout',
  },
  imports: [
    TranslatePipe,
    OfferItemComponent,
    ServerErrorComponent,
    StoreItemComponent,
    Skeleton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private isServer = !isPlatformBrowser(this.platformId);
  private loadingAnimationService = inject(LoadingAnimationService);
  private resourcesHttpService = inject(ResourcesHttpService);
  private errorService = inject(ErrorService);
  private destroyRef = inject(DestroyRef);

  offers: QueryResult = !this.isServer ? injectQuery(() => ({
    queryKey: [RESOURCE_OFFERS],
    queryFn: () => firstValueFrom(this.resourcesHttpService.findOffers())
  })) : tempQueryResult();

  stores: QueryResult = !this.isServer ? injectQuery(() => ({
    queryKey: [RESOURCE_STORE],
    queryFn: () => firstValueFrom(this.resourcesHttpService.findStores())
  })) : tempQueryResult();

  offersStatus = !this.isServer ? toObservable(this.offers.status) : tempStatus$();
  storeStatus = !this.isServer ? toObservable(this.stores.status) : tempStatus$();
  status = merge(this.offersStatus, this.storeStatus);

  ngOnInit(): void {
    const subscription = this.status.pipe().subscribe({
      next: status => {
        if (status === PENDING) {
          this.loadingAnimationService.startLoading();
        }

        if (status === ERROR) {
          this.loadingAnimationService.stopLoading();
        }

        if (status === SUCCESS && this.offers.status() === SUCCESS && this.stores.status() === SUCCESS) {
          this.loadingAnimationService.stopLoading();

          const offersResponse: ResponseDTO = this.offers.data()!;
          const storesResponse: ResponseDTO = this.stores.data()!;

          if (offersResponse.status.error && offersResponse.error) {
            this.errorService.handleError(offersResponse.error);
            return;
          }

          if (storesResponse.status.error && storesResponse.error) {
            this.errorService.handleError(storesResponse.error);
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
