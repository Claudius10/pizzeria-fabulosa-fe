import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit} from '@angular/core';
import {CardModule} from 'primeng/card';
import {AddressDTO, OrderDetailsDTO} from '../../../../../interfaces/dto/order';
import {TranslatePipe} from '@ngx-translate/core';
import {StoreDTO} from '../../../../../interfaces/dto/resources';
import {QueryResult} from '../../../../../interfaces/query';
import {RESOURCE_STORES} from '../../../../../utils/query-keys';
import {ResourceService} from '../../../../../services/http/resources/resource.service';
import {StoreCheckoutComponent} from '../../../../checkout/steps/store/store-checkout.component';
import {toObservable} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-address-details',
  imports: [
    CardModule,
    TranslatePipe,
    StoreCheckoutComponent
  ],
  templateUrl: './address-details.component.html',
  styleUrl: './address-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressDetailsComponent implements OnInit {
  address = input.required<AddressDTO>();
  orderDetails = input.required<OrderDetailsDTO>();
  private resourceService = inject(ResourceService);
  private destroyRef = inject(DestroyRef);
  stores: QueryResult = this.resourceService.findStores({queryKey: RESOURCE_STORES});
  status = toObservable(this.stores.status);
  selectedStore: StoreDTO | null = null;

  ngOnInit(): void {
    const subscription = this.status.subscribe(status => {
      if (status === "success") {
        const fetchedStores = this.stores.data()!.payload as StoreDTO[];
        const selectedStoreIndex = fetchedStores.findIndex(store => store.id === this.address().id);

        if (selectedStoreIndex !== -1) {
          this.selectedStore = fetchedStores[selectedStoreIndex];
        }
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
