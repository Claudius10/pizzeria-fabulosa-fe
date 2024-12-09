import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CheckoutFormService} from '../../../../../services/forms/checkout/checkout-form.service';
import {Router} from '@angular/router';
import {StoresQueryResult} from '../../../../../interfaces/query';
import {RESOURCE_STORES} from '../../../../../utils/query-keys';
import {ResourceService} from '../../../../../services/http/resources/resource.service';
import {StoreDTO} from '../../../../../interfaces/dto/resources';
import {StoreCheckoutComponent} from '../../store/store-checkout.component';
import {CardModule} from 'primeng/card';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-step-five-summary',
  standalone: true,
  imports: [
    StoreCheckoutComponent,
    CardModule,
    InputTextareaModule,
    Button
  ],
  templateUrl: './step-five-summary.component.html',
  styleUrl: './step-five-summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepFiveSummaryComponent {
  protected checkoutFormService = inject(CheckoutFormService);
  private resourceService = inject(ResourceService);
  private router = inject(Router);
  selectedStore: StoreDTO | null;

  constructor() {
    this.checkoutFormService.step.set(4);
    if (this.checkoutFormService.isFormFilled() && this.checkoutFormService.where()!.id !== null) {
      console.log(this.checkoutFormService.where()!.id);

      const stores: StoresQueryResult = this.resourceService.findStores({queryKey: RESOURCE_STORES});
      const selectedStoreIndex = stores.data()!.findIndex(store => store.id === this.checkoutFormService.where()!.id);
      this.selectedStore = stores.data()![selectedStoreIndex];

    } else {
      this.selectedStore = null;
    }
  }

  previousStep() {
    this.router.navigate(['/new-order/step-four']);
  }

  cancel() {
    this.checkoutFormService.cancel();
    this.router.navigate(['/']);
  }

  submit() {
  }
}
