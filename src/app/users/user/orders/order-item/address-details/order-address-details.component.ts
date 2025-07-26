import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {CardModule} from 'primeng/card';
import {TranslatePipe} from '@ngx-translate/core';
import {RESOURCE_STORES} from '../../../../../../utils/query-keys';
import {StoreCheckoutComponent} from '../../../../../checkout/steps/store/store-checkout.component';
import {LoadingAnimationService} from '../../../../../services/animation/loading-animation.service';
import {ErrorService} from '../../../../../services/error/error.service';
import {ERROR, SUCCESS} from '../../../../../../utils/constants';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {firstValueFrom} from 'rxjs';
import {OrderDetailsDTO} from '../../../../../../api/business';
import {Store, StoreAPIService, StoreListDTO} from '../../../../../../api/public';

@Component({
  selector: 'order-address-details',
  imports: [
    CardModule,
    TranslatePipe,
    StoreCheckoutComponent
  ],
  templateUrl: './order-address-details.component.html',
  styleUrl: './order-address-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderAddressDetailsComponent implements OnInit {
  readonly address = input.required<string>();
  readonly orderDetails = input.required<OrderDetailsDTO>();
  private readonly destroyRef = inject(DestroyRef);
  private readonly errorService = inject(ErrorService);
  private readonly storeAPI = inject(StoreAPIService);
  private readonly loadingAnimationService = inject(LoadingAnimationService);
  protected readonly selectedStore = signal<Store | null>(null);

  protected stores = injectQuery(() => ({
    queryKey: RESOURCE_STORES,
    queryFn: () => firstValueFrom(this.storeAPI.findAll()),
    enabled: false
  }));

  ngOnInit(): void {
    if (this.orderDetails().storePickUp) {
      this.loadingAnimationService.startLoading();

      this.stores.refetch().then(promise => {
        const status = promise.status;

        if (status === SUCCESS) {
          const response: StoreListDTO = promise.data;
          const fetchedStores: Store[] = response.stores;
          const selectedStoreIndex = fetchedStores.findIndex(store => store.address === this.address());

          if (selectedStoreIndex !== -1) {
            this.selectedStore.set(fetchedStores[selectedStoreIndex]);
          }
        }

        if (status === ERROR) {
          this.errorService.handleServerNoResponse();
          this.errorService.handleError(this.stores.error()!);
        }

        this.loadingAnimationService.stopLoading();
      });


      this.destroyRef.onDestroy(() => {
        this.loadingAnimationService.stopLoading();
      });
    }
  }
}
