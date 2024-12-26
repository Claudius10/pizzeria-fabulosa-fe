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
import {TranslatePipe} from '@ngx-translate/core';
import {ResponseDTO} from '../../interfaces/http/api';
import {MessageService} from 'primeng/api';
import {ERROR, PENDING, SUCCESS} from '../../utils/constants';

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
  providers: [MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private loadingAnimationService = inject(LoadingAnimationService);
  private messageService = inject(MessageService);
  private resourceService = inject(ResourceService);
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

          if (offersResponse.status.error) {
            this.errorService.handleError(offersResponse, this.messageService);
            return;
          }

          if (storesResponse.status.error) {
            this.errorService.handleError(storesResponse, this.messageService);
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
