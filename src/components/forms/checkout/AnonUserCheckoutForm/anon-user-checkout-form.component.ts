import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
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
import {CartComponent} from '../../../cart/cart.component';
import {CartService} from '../../../../services/cart/cart.service';
import {OrderService} from '../../../../services/order/order.service';
import {AnonOrderDTO} from '../../../../interfaces/dto/order';

@Component({
  selector: 'app-anon-user-checkout-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CartComponent
  ],
  templateUrl: './anon-user-checkout-form.component.html',
  styleUrl: './anon-user-checkout-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnonUserCheckoutFormComponent {
  protected checkoutFormService = inject(CheckoutFormService);
  private orderService = inject(OrderService);
  private cartService = inject(CartService);
  private newAnonOrderMutation = this.orderService.newAnonOrderMutation();

  form = new FormGroup({
    customer: new FormGroup({
      fullName: new FormControl("", {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
        nonNullable: true,
        updateOn: "blur"
      }),
      contactNumber: new FormControl("", {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
        nonNullable: true,
        updateOn: "blur"
      }),
      email: new FormControl("", {
        validators: [Validators.pattern(emailRgx)],
        nonNullable: true,
        updateOn: "blur"
      })
    }),
    address: new FormGroup({
      id: new FormControl<number | null>(null),
      street: new FormControl("", {
          validators: [Validators.required, Validators.pattern(esCharsRegex)],
          nonNullable: true,
          updateOn: "blur"
        }
      ),
      number: new FormControl("", {
          validators: [Validators.required, Validators.pattern(numbersRegex)],
          nonNullable: true,
          updateOn: "blur"
        }
      ),
      gate: new FormControl<string | null>(null, [Validators.pattern(esCharsAndNumbersRegex), Validators.maxLength(25)]),
      staircase: new FormControl<string | null>(null, [Validators.pattern(esCharsAndNumbersRegex), Validators.maxLength(25)]),
      floor: new FormControl<string | null>(null, [Validators.pattern(esCharsAndNumbersRegex), Validators.maxLength(25)]),
      door: new FormControl<string | null>(null, [Validators.pattern(esCharsAndNumbersRegex), Validators.maxLength(25)])
    }),
    orderDetails: new FormGroup({
      deliveryTime: new FormControl("Lo antes posible", {
        validators: [Validators.required],
        nonNullable: true,
        updateOn: "blur"
      }),
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
  }, {validators: [validateStreet, validateStreetNumber, validateChangeToGive]});

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      const controls = this.form.controls;

      Object.keys(controls).forEach(control => {
        console.log(this.form.get(control)?.value);
        console.log(this.form.get(control)?.status);
        console.log(this.form.get(control)?.valid);
      });

      return;
    }

    console.log(this.form.value);
    this.newAnonOrderMutation.mutate({
      anonCustomerName: this.form.get("customer.fullName")!.value,
      anonCustomerContactNumber: Number(this.form.get("customer.contactNumber")!.value),
      anonCustomerEmail: this.form.get("customer.email")!.value,
      address: {
        id: null,
        street: this.form.get("address.street")!.value,
        streetNr: Number(this.form.get("address.number")!.value),
        gate: this.form.get("address.gate")!.value === null ? null : this.form.get("address.gate")!.value,
        staircase: this.form.get("address.staircase")!.value === null ? null : this.form.get("address.staircase")!.value,
        floor: this.form.get("address.floor")!.value === null ? null : this.form.get("address.floor")!.value,
        door: this.form.get("address.door")!.value === null ? null : this.form.get("address.door")!.value,
      },
      orderDetails: {
        id: null,
        deliveryTime: this.form.get("orderDetails.deliveryTime")!.value,
        paymentMethod: this.form.get("orderDetails.paymentMethod")!.value,
        billToChange: this.form.get("orderDetails.billToChange")!.value === null ? null : this.form.get("orderDetails.billToChange")!.value,
        comment: this.form.get("orderDetails.comment")!.value === null ? null : this.form.get("orderDetails.comment")!.value,
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
      },
      onError: (error, variables, context) => {
        console.log(error);
      }
    });
  }
}

const validateStreet: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return null;
};

const validateStreetNumber: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return null;
};

const validateContactNumber: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
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
