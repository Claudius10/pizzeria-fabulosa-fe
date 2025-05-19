import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {CardModule} from 'primeng/card';
import {TranslatePipe} from '@ngx-translate/core';
import {RESOURCE_STORES} from '../../../../../utils/query-keys';
import {StoreCheckoutComponent} from '../../../../checkout/steps/store/store-checkout.component';
import {LoadingAnimationService} from '../../../../../services/animation/loading-animation.service';
import {ErrorService} from '../../../../../services/error/error.service';
import {ERROR, SUCCESS} from '../../../../../utils/constants';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {firstValueFrom} from 'rxjs';
import {AddressDTO, OrderDetailsDTO, ResourcesAPIService, Store, StoreListDTO} from '../../../../../api';

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
  address = input.required<AddressDTO>();
  orderDetails = input.required<OrderDetailsDTO>();
  private loadingAnimationService = inject(LoadingAnimationService);
  private resourcesAPI = inject(ResourcesAPIService);
  private errorService = inject(ErrorService);
  private destroyRef = inject(DestroyRef);

  protected stores = injectQuery(() => ({
    queryKey: RESOURCE_STORES,
    queryFn: () => firstValueFrom(this.resourcesAPI.findAllStores()),
    enabled: false
  }));

  protected selectedStore = signal<Store | null>(null);

  ngOnInit(): void {
    if (this.orderDetails().storePickUp) {
      this.loadingAnimationService.startLoading();

      this.stores.refetch().then(promise => {
        const status = promise.status;

        if (status === SUCCESS) {
          const response: StoreListDTO = promise.data;
          const fetchedStores: Store[] = response.stores;
          const selectedStoreIndex = fetchedStores.findIndex(store => store.address.id === this.address().id);

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
