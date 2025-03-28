import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {CardModule} from 'primeng/card';
import {AddressDTO, OrderDetailsDTO} from '../../../../../utils/interfaces/dto/order';
import {TranslatePipe} from '@ngx-translate/core';
import {StoreDTO} from '../../../../../utils/interfaces/dto/resources';
import {QueryOnDemand} from '../../../../../utils/interfaces/query';
import {RESOURCE_STORES} from '../../../../../utils/query-keys';
import {StoreCheckoutComponent} from '../../../../checkout/steps/store/store-checkout.component';
import {LoadingAnimationService} from '../../../../../services/animation/loading-animation.service';
import {ErrorService} from '../../../../../services/error/error.service';
import {ERROR, SUCCESS} from '../../../../../utils/constants';
import {ResponseDTO} from '../../../../../utils/interfaces/http/api';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {firstValueFrom} from 'rxjs';
import {ResourcesHttpService} from '../../../../../services/http/resources/resources-http.service';

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
  private resourcesHttpService = inject(ResourcesHttpService);
  private errorService = inject(ErrorService);
  private destroyRef = inject(DestroyRef);

  protected stores: QueryOnDemand = injectQuery(() => ({
    queryKey: [RESOURCE_STORES],
    queryFn: () => firstValueFrom(this.resourcesHttpService.findStores()),
    enabled: false
  }));

  selectedStore = signal<StoreDTO | null>(null);

  ngOnInit(): void {
    if (this.orderDetails().storePickUp) {
      this.loadingAnimationService.startLoading();

      this.stores.refetch().then(promise => {
        const status = promise.status;

        if (status === SUCCESS) {
          const response: ResponseDTO = promise.data;

          if (response.status.error && response.error) {
            this.errorService.handleError(response.error);
          } else {
            const fetchedStores = response.payload as StoreDTO[];
            const selectedStoreIndex = fetchedStores.findIndex(store => store.address.id === this.address().id);
            if (selectedStoreIndex !== -1) {
              this.selectedStore.set(fetchedStores[selectedStoreIndex]);
            }
          }
        }

        if (status === ERROR) {
          this.errorService.handleServerNoResponse();
        }

        this.loadingAnimationService.stopLoading();
      });


      this.destroyRef.onDestroy(() => {
        this.loadingAnimationService.stopLoading();
      });
    }
  }
}
