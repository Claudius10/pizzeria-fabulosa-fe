import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
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
import {SmallScreenStepsComponent} from '../../../layout/steps/small-screen-steps.component';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {CheckoutCartComponent} from '../../../cart/checkout/checkout-cart.component';
import {StepOneWhoComponent} from '../step-one-who/steponewho.component';
import {StepTwoWhereComponent} from '../step-two-where/steptwowhere.component';

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
    SmallScreenStepsComponent,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    CheckoutCartComponent,
    StepOneWhoComponent,
    StepTwoWhereComponent
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
  steps: MenuItem[] = [
    {label: "Mis datos",},
    {label: "Dirección de entrega"},
    {label: "Plazo de entrega"},
    {label: "Método de pago"}, {label: "Resumen"},
  ];

  form = getForm();

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
      details: new FormControl("", {
        nonNullable: false,
        updateOn: "blur"
      }),
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

  if (!isStreetValid) {
    return {streetValid: false};
  }

  if (!isNumberValid) {
    return {isNumberValid: false};
  }

  if (details && details.value.length > 0) {
    if (!esCharsAndNumbersRegex.test(details.value)) {
      return {isDetailsValid: false};
    }
  }

  return null;
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
