import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {CheckoutFormService} from '../../../../services/forms/checkout/checkout-form.service';
import {
  emailRgx,
  esCharsAndNumbersAndBasicSymbolsRgx,
  esCharsAndNumbersRegex,
  esCharsRegex,
  numbersRegex
} from '../../../../regex';
import {CartService} from '../../../../services/cart/cart.service';
import {OrderService} from '../../../../services/http/order/order.service';
import {AnonOrderDTO} from '../../../../interfaces/dto/order';
import {MenuItem} from 'primeng/api';
import {StepsModule} from 'primeng/steps';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {Button} from 'primeng/button';
import {SmallScreenStepsComponent} from '../../../layout/steps/small-screen-steps.component';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {CheckoutCartComponent} from '../../../cart/checkout/checkout-cart.component';
import {ResourceService} from '../../../../services/http/resources/resource.service';
import {StoresQueryResult} from '../../../../interfaces/query';
import {RESOURCE_STORES} from '../../../../utils/query-keys';
import {StoreCheckoutComponent} from '../store/store-checkout.component';

@Component({
  selector: 'app-anon-user-checkout-form',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [
    ReactiveFormsModule,
    StepsModule,
    CardModule,
    PanelModule,
    Button,
    SmallScreenStepsComponent,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    CheckoutCartComponent,
    StoreCheckoutComponent
  ],
  templateUrl: './anon-user-checkout-form.component.html',
  styleUrl: './anon-user-checkout-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnonUserCheckoutFormComponent {
  protected checkoutFormService = inject(CheckoutFormService);
  private orderService = inject(OrderService);
  private cartService = inject(CartService);
  private createAnonOrder = this.orderService.createAnonOrder();
  private resourceService = inject(ResourceService);
  stores: StoresQueryResult = this.resourceService.findStores({queryKey: RESOURCE_STORES});
  selectedStore = signal<number | null>(null);
  steps: MenuItem[] = [
    {label: "Mis datos",},
    {label: "Dirección de entrega"},
    {label: "Plazo de entrega"},
    {label: "Método de pago"}, {label: "Resumen"},
  ];

  form = getForm();

  selectDelivery(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement.value === "home") {
      this.checkoutFormService.homeDelivery.set(true);
      this.selectedStore.set(null);
      this.form.controls.where.controls.storeId.setValue(null);
    } else {
      this.checkoutFormService.homeDelivery.set(false);
    }
  }

  isStepValid(stepNumber: number) {
    console.log(stepNumber);
    if (stepNumber === 0) {
      const validOne = this.form.controls.who.valid;

      if (!validOne) {
        Object.keys(this.form.controls.who.controls).forEach(controlName => {
          const control = this.form.get(`who.${controlName}`);
          if (!control!.valid) {
            control!.markAsTouched();
          } else {
            control!.markAsUntouched();
          }
        });
      }

      return validOne;
    }

    if (stepNumber === 1) {
      const validTwo = this.form.controls.where.valid;
      console.log(validTwo);
      console.log(this.form.controls.where.errors);

      if (!validTwo) {
        Object.keys(this.form.controls.where.controls).forEach(controlName => {
          const control = this.form.get(`where.${controlName}`);
          console.log(control?.valid);
          if (!control!.valid) {
            console.log(control?.errors);
            control!.markAsTouched();
          }
        });
      }

      return validTwo;
    }

    if (stepNumber === 2) {
      const validThree = this.form.controls.when.valid;

      if (!validThree) {
        Object.keys(this.form.controls.when.controls).forEach(controlName => {
          const control = this.form.get(`when.${controlName}`);
          if (!control!.valid) {
            control!.markAsTouched();
          }
        });
      }

      return validThree;
    }

    if (stepNumber === 3) {
      const validFour = this.form.controls.how.valid;

      if (!validFour) {
        Object.keys(this.form.controls.how.controls).forEach(controlName => {
          const control = this.form.get(`how.${controlName}`);
          if (!control!.valid) {
            control!.markAsTouched();
          }
        });
      }

      return validFour;
    }
    return false;
  }

  nextStep() {
    if (this.isStepValid(this.checkoutFormService.step())) {
      this.checkoutFormService.nextStep();
    }
  }

  setSelectedStoreId(id: number) {
    this.form.controls.where.controls.storeId.setValue(id);
    this.selectedStore.set(id);
  }

  onSubmit(): void {
    console.log(this.form.value);
    if (this.form.invalid) {
      this.createAnonOrder.mutate({
        anonCustomerName: this.form.get("who.fullName")!.value,
        anonCustomerContactNumber: Number(this.form.get("who.contactNumber")!.value),
        anonCustomerEmail: this.form.get("who.email")!.value,
        address: {
          id: this.form.get("where.storeId")!.value === null ? null : this.form.get("where.storeId")!.value,
          street: this.form.get("where.street")!.value,
          streetNr: Number(this.form.get("where.number")!.value),
          gate: null,
          staircase: null,
          floor: null,
          door: this.form.get("where.door")!.value === null ? null : this.form.get("where.door")!.value,
        },
        orderDetails: {
          id: null,
          deliveryTime: this.form.get("when.deliveryTime")!.value,
          paymentMethod: this.form.get("how.paymentMethod")!.value,
          billToChange: this.form.get("how.billToChange")!.value === null ? null : this.form.get("how.billToChange")!.value,
          comment: this.form.get("how.comment")!.value === null ? null : this.form.get("how.comment")!.value,
        },
        cart: {
          id: null,
          cartItems: this.cartService.cartItems(),
          totalCost: this.cartService.cartTotal(),
          totalCostOffers: this.cartService.cartTotalAfterOffers(),
          totalQuantity: this.cartService.cartQuantity(),
        }
      }, {
        onSuccess: (response: AnonOrderDTO) => {
          console.log(response);
          console.log("success");
          this.cartService.clear();
        },
        onError: (error, variables, context) => {
          console.log(error);
        }
      });
    }
  }
}

const getForm = () => {
  return new FormGroup({
    who: new FormGroup({
      fullName: new FormControl("", {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
        nonNullable: true,
        updateOn: "blur"
      }),
      email: new FormControl("", {
        validators: [Validators.required, Validators.pattern(emailRgx)],
        nonNullable: true,
        updateOn: "blur"
      }),
      contactNumber: new FormControl("", {
        validators: [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(numbersRegex)],
        nonNullable: true,
        updateOn: "blur"
      }),
    }),
    where: new FormGroup({
      storeId: new FormControl<number | null>(null),
      id: new FormControl<number | null>(null),
      street: new FormControl("", {
          nonNullable: true,
          updateOn: "blur"
        }
      ),
      number: new FormControl("", {
          nonNullable: true,
          updateOn: "blur"
        }
      ),
      details: new FormControl(""),
    }, {validators: [validateWhere]}),
    when: new FormGroup({
      deliveryTime: new FormControl("Lo antes posible", {
        validators: [Validators.required],
        nonNullable: true,
        updateOn: "blur"
      }),
    }),
    how: new FormGroup({
      paymentMethod: new FormControl("Tarjeta", {
        validators: [Validators.required],
        nonNullable: true,
        updateOn: "blur"
      }),
      // ONLY USING 'changeRequestChoice' SO I CAN ENABLE/DISABLE THE SELECT, NOT ACTUALLY SENDING THE VALUE TO THE BACK-END
      changeRequestChoice: new FormControl({value: "F", disabled: true}, {
        nonNullable: true,
      }),
      billToChange: new FormControl<number | null>(null, {
        validators: [Validators.pattern(numbersRegex)],
        updateOn: "blur"
      }),
      comment: new FormControl<string | null>(null, [Validators.pattern(esCharsAndNumbersAndBasicSymbolsRgx), Validators.maxLength(250)])
    })
  }, {validators: [validateChangeToGive]});
};

const validateWhere: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const storeId = control.get("storeId");
  const id = control.get("id");
  console.log(storeId?.value);
  console.log(id?.value);
  // if pick up store is selected
  if (storeId && storeId.value !== null) {
    return null;
  }

  // if user selected home address
  if (id && id.value !== null) {
    return null;
  }

  const street = control.get("street");
  const number = control.get("number");
  const details = control.get("details");

  const isStreetValid = street && street.value.length > 0 && esCharsRegex.test(street.value);
  const isNumberValid = number && number.value.length > 0 && number.value.length <= 9 && numbersRegex.test(number.value);
  const isDetailsValid = details && details.value.length <= 25 && esCharsAndNumbersRegex.test(details.value);

  if (!isStreetValid) {
    return {streetValid: false};
  }

  if (!isNumberValid) {

    return {isNumberValid: false};
  }

  if (!isDetailsValid) {
    console.log("regex", esCharsAndNumbersRegex.test(details!.value));
    return {isDetailsValid: false};
  }

  return {valid: false};
};


const validateDeliveryTime: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const deliverNow = control.get("deliverNow");

  if (deliverNow && !deliverNow.value) {
    const deliveryTime = control.get("deliveryTime");
    if (deliveryTime && (!deliveryTime.value || deliveryTime.value.length < 0)) {
      return {valid: false};
    }
  }

  return null;
};

const validateChangeToGive: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const changeRequested = control.get("changeRequestChoice");
  const billToChange = control.get("billToChange");
  return changeRequested && changeRequested.value === "V" && billToChange && billToChange.value <= 0 ? {valid: false} : null;
};
