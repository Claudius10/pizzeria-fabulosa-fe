import {ChangeDetectionStrategy, Component, inject, input, OnInit} from '@angular/core';
import {StoreDTO} from '../../../../interfaces/dto/resources';
import {StoresQueryResult} from '../../../../interfaces/query';
import {RESOURCE_STORES} from '../../../../utils/query-keys';
import {ResourceService} from '../../../../services/http/resources/resource.service';
import {CardModule} from 'primeng/card';
import {StoreCheckoutComponent} from '../../../forms/checkout/store/store-checkout.component';
import {AddressDTO, OrderDetailsDTO} from '../../../../interfaces/dto/order';

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
  stores: StoresQueryResult = this.resourceService.findStores({queryKey: RESOURCE_STORES});
  selectedStore: StoreDTO | null = null;

  ngOnInit(): void {
    const selectedStoreIndex = this.stores.data()!.findIndex(store => store.id === this.address().id);

    if (selectedStoreIndex !== -1) {
      this.selectedStore = this.stores.data()![selectedStoreIndex];
    }
  }
}
