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
import {isFormValid} from '../../../../../utils/functions';
import {ResponseDTO} from '../../../../../interfaces/http/api';


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
      const payload = stores.data()!.payload as StoreDTO[];
      const selectedStoreIndex = payload.findIndex(store => store.id === this.checkoutFormService.where()!.id);
      this.selectedStore = payload[selectedStoreIndex];

    } else {
      this.selectedStore = null;
    }
  }

  form = new FormGroup({
    comment: new FormControl<string | null>(null, {
      validators: [Validators.pattern(esCharsAndNumbersAndBasicSymbolsRgx)],
      nonNullable: false,
      updateOn: "blur"
    }),
  });

  previousStep() {
    this.router.navigate(['order', 'new', 'step-four']);
  }

  goBack(start: boolean) {
    this.checkoutFormService.clear();
    if (start) {
      this.router.navigate(['order', 'new', 'step-one']);
    } else {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    if (isFormValid(this.form)) {
      this.createOrder();
    }
  }

  createOrder() {
    this.createAnonOrder.mutate({
      customer: {
        name: this.checkoutFormService.who()!.name,
        contactNumber: this.checkoutFormService.who()!.contactNumber,
        email: this.checkoutFormService.who()!.email,
      },
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
      onSuccess: (response: ResponseDTO) => {
        this.cartService.clear();
        this.checkoutFormService.clear();
        this.cartService.set(response.payload.cart.cartItems, response.payload.cart.totalQuantity, response.payload.cart.totalCost);
        this.checkoutFormService.anonOrderSuccess.set(response.payload);
        this.router.navigate(['order', 'success']);
      },
      onError: (error, variables, context) => {
        console.log(error);
      }
    });
  }
}
