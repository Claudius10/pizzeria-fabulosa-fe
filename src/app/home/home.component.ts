import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {RESOURCE_OFFERS, RESOURCE_STORES} from '../../utils/query-keys';
import {toObservable} from '@angular/core/rxjs-interop';
import {firstValueFrom, merge} from 'rxjs';
import {LoadingAnimationService} from '../services/animation/loading-animation.service';
import {OfferItemComponent} from './offers/offer-item.component';
import {StoreItemComponent} from './stores/store-item.component';
import {ErrorService} from '../services/error/error.service';
import {ServerErrorComponent} from '../routes/error/server-no-response/server-error.component';
import {ERROR, PENDING, SUCCESS} from '../../utils/constants';
import {TranslatePipe} from '@ngx-translate/core';
import {Skeleton} from "primeng/skeleton";
import {injectQuery} from '@tanstack/angular-query-experimental';
import {isPlatformBrowser} from '@angular/common';
import {tempQueryResult, tempStatus$} from '../../utils/placeholder';
import {QueryResult} from '../../utils/interfaces/query';
import {OfferAPIService, OfferListDTO, StoreAPIService, StoreListDTO} from '../../api/public';

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
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isServer = !isPlatformBrowser(this.platformId);
  private readonly destroyRef = inject(DestroyRef);
  private readonly errorService = inject(ErrorService);
  private readonly loadingAnimationService = inject(LoadingAnimationService);
  private readonly offerAPI = inject(OfferAPIService);
  private readonly storeAPI = inject(StoreAPIService);

  protected readonly offers: QueryResult<OfferListDTO | undefined> = !this.isServer ? injectQuery(() => ({
    queryKey: RESOURCE_OFFERS,
    queryFn: () => firstValueFrom(this.offerAPI.findAll1())
  })) : tempQueryResult();

  protected readonly stores: QueryResult<StoreListDTO | undefined> = !this.isServer ? injectQuery(() => ({
    queryKey: RESOURCE_STORES,
    queryFn: () => firstValueFrom(this.storeAPI.findAll())
  })) : tempQueryResult();

  private readonly offersStatus = !this.isServer ? toObservable(this.offers.status) : tempStatus$();
  private readonly storeStatus = !this.isServer ? toObservable(this.stores.status) : tempStatus$();
  private readonly status = merge(this.offersStatus, this.storeStatus);

  ngOnInit(): void {
    const subscription = this.status.pipe().subscribe({
      next: status => {
        if (status === PENDING) {
          this.loadingAnimationService.startLoading();
        }

        if (status === ERROR) {
          this.loadingAnimationService.stopLoading();

          let offersError = this.offers.error();
          let storesError = this.stores.error();

          if (offersError) {
            this.errorService.handleError(offersError);
          } else if (storesError) {
            this.errorService.handleError(storesError);
          }
        }

        if (status === SUCCESS && this.offers.status() === SUCCESS && this.stores.status() === SUCCESS) {
          this.loadingAnimationService.stopLoading();
        }
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      this.loadingAnimationService.stopLoading();
    });
  }
}
