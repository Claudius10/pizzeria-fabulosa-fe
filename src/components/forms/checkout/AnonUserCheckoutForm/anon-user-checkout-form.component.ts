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
import {NgClass} from '@angular/common';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';

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
    NgClass,
    IconFieldModule,
    InputIconModule
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

  items: MenuItem[] = [
    {label: "Mis datos",},
    {label: "Dirección de entrega"},
    {label: "Plazo de entrega"},
    {label: "Método de pago"},
    {label: "Resumen"},
  ];

  form = getForm();
  valid = signal(true);

  isStepValid(stepNumber: number) {
    console.log('stepNumber', stepNumber);
    if (stepNumber === 0) {
      const valid = this.form.controls.who.valid;
      if (!valid) {
        this.valid.set(false);
      }
      return valid;
    }

    if (stepNumber === 1) {
      return this.form.controls.where.valid;
    }

    if (stepNumber === 0) {
      return this.form.controls.when.valid;
    }

    if (stepNumber === 0) {
      return this.form.controls.how.valid;
    }
    return false;
  }

  isFormValid() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      const controls = this.form.controls;

      Object.keys(controls).forEach(control => {
        console.log(this.form.get(control)?.value);
        console.log(this.form.get(control)?.status);
        console.log(this.form.get(control)?.valid);
      });

      return false;
    }
    return true;
  }

  nextStep() {
    if (this.isStepValid(this.checkoutFormService.step())) {
      this.checkoutFormService.nextStep();
    }
  }

  onSubmit(): void {
    console.log(this.form.value);
    if (this.isFormValid()) {
      this.createAnonOrder.mutate({
        anonCustomerName: this.form.get("who.fullName")!.value,
        anonCustomerContactNumber: Number(this.form.get("who.contactNumber")!.value),
        anonCustomerEmail: this.form.get("who.email")!.value,
        address: {
          id: this.form.get("where.storeId")!.value === null ? null : this.form.get("where.storeId")!.value,
          street: this.form.get("where.address.street")!.value,
          streetNr: Number(this.form.get("where.address.number")!.value),
          gate: this.form.get("where.address.gate")!.value === null ? null : this.form.get("where.address.gate")!.value,
          staircase: this.form.get("where.address.staircase")!.value === null ? null : this.form.get("where.address.staircase")!.value,
          floor: this.form.get("where.address.floor")!.value === null ? null : this.form.get("where.address.floor")!.value,
          door: this.form.get("where.address.door")!.value === null ? null : this.form.get("where.address.door")!.value,
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
    where: new FormGroup({
      storeId: new FormControl<number | null>(null),
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
        door: new FormControl<string | null>(null, [Validators.pattern(esCharsAndNumbersRegex), Validators.maxLength(25)]),
      }),
    }),
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
  }, {validators: [validateStreet, validateStreetNumber, validateChangeToGive]});
};

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
