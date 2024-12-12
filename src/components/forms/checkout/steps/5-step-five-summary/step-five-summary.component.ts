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
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {esCharsAndNumbersAndBasicSymbolsRgx} from '../../../../../regex';
import {CartService} from '../../../../../services/cart/cart.service';
import {OrderService} from '../../../../../services/http/order/order.service';
import {AnonOrderMutation} from '../../../../../interfaces/mutation';
import {AnonOrderDTO} from '../../../../../interfaces/dto/order';
import {isStepValid} from '../../../../../utils/functions';

@Component({
  selector: 'app-step-five-summary',
  standalone: true,
  imports: [
    StoreCheckoutComponent,
    CardModule,
    InputTextareaModule,
    Button,
    ReactiveFormsModule
  ],
  templateUrl: './step-five-summary.component.html',
  styleUrl: './step-five-summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepFiveSummaryComponent {
  private resourceService = inject(ResourceService);
  protected checkoutFormService = inject(CheckoutFormService);
  private orderService = inject(OrderService);
  private cartService = inject(CartService);
  private createAnonOrder: AnonOrderMutation = this.orderService.createAnonOrder();
  private router = inject(Router);
  selectedStore: StoreDTO | null;

  constructor() {
    this.checkoutFormService.step.set(4);
    if (this.checkoutFormService.isStepFilled(4) && this.checkoutFormService.where()!.id !== null) {

      const stores: StoresQueryResult = this.resourceService.findStores({queryKey: RESOURCE_STORES});
      const selectedStoreIndex = stores.data()!.findIndex(store => store.id === this.checkoutFormService.where()!.id);
      this.selectedStore = stores.data()![selectedStoreIndex];

    } else {
      this.selectedStore = null;
    }
  }

  form = new FormGroup({
    comment: new FormControl("", {
      validators: [Validators.pattern(esCharsAndNumbersAndBasicSymbolsRgx)],
      nonNullable: false,
      updateOn: "blur"
    }),
  });

  previousStep() {
    this.router.navigate(['/new-order/step-four']);
  }

  goBack(start: boolean) {
    this.checkoutFormService.clear();
    if (start) {
      this.router.navigate(['/new-order', 'step-one']);
    } else {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    console.log(this.form.value);
    if (isStepValid(this.form)) {
      this.createOrder();
    }
  }

  createOrder() {
    this.createAnonOrder.mutate({
      anonCustomerName: this.checkoutFormService.who()!.anonCustomerName,
      anonCustomerContactNumber: this.checkoutFormService.who()!.anonCustomerContactNumber,
      anonCustomerEmail: this.checkoutFormService.who()!.anonCustomerEmail,
      address: {
        id: this.checkoutFormService.where()!.id,
        street: this.checkoutFormService.where()!.street,
        number: this.checkoutFormService.where()!.number,
        details: this.checkoutFormService.where()!.details
      },
      orderDetails: {
        id: null,
        deliveryTime: this.checkoutFormService.when()!.deliveryTime,
        paymentMethod: this.checkoutFormService.how()!.paymentMethod,
        billToChange: this.checkoutFormService.how()!.billToChange,
        comment: this.form.get("comment")!.value,
      },
      cart: {
        id: null,
        cartItems: this.cartService.cartItems(),
        totalCost: this.cartService.cartTotal(),
        totalCostOffers: Number(this.cartService.cartTotalAfterOffers().toFixed(2)),
        totalQuantity: Number(this.cartService.cartQuantity().toFixed(2)),
      }
    }, {
      onSuccess: (response: AnonOrderDTO) => {
        console.log(response);
        console.log("success");
        this.cartService.clear();
        this.checkoutFormService.clear();
      },
      onError: (error, variables, context) => {
        console.log(error);
      }
    });
  }
}
