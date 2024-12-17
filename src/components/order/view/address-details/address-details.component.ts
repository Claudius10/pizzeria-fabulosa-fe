import {ChangeDetectionStrategy, Component, inject, input, OnInit} from '@angular/core';
import {StoreDTO} from '../../../../interfaces/dto/resources';
import {RESOURCE_STORES} from '../../../../utils/query-keys';
import {ResourceService} from '../../../../services/http/resources/resource.service';
import {CardModule} from 'primeng/card';
import {StoreCheckoutComponent} from '../../../forms/checkout/steps/2-step-two-where/store/store-checkout.component';
import {AddressDTO, OrderDetailsDTO} from '../../../../interfaces/dto/order';
import {QueryResult} from '../../../../interfaces/query';

@Component({
  selector: 'app-address-details',
  standalone: true,
  imports: [
    CardModule,
    StoreCheckoutComponent
  ],
  templateUrl: './address-details.component.html',
  styleUrl: './address-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressDetailsComponent implements OnInit {
  address = input.required<AddressDTO>();
  orderDetails = input.required<OrderDetailsDTO>();
  private resourceService = inject(ResourceService);
  stores: QueryResult = this.resourceService.findStores({queryKey: RESOURCE_STORES});
  selectedStore: StoreDTO | null = null;

  ngOnInit(): void {
    const payload = this.stores.data()!.payload as StoreDTO[];
    const selectedStoreIndex = payload.findIndex(store => store.id === this.address().id);

    if (selectedStoreIndex !== -1) {
      this.selectedStore = payload[selectedStoreIndex];
    }
  }
}
