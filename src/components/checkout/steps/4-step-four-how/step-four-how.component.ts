import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
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
import {CheckoutFormService} from '../../../../services/checkout/checkout-form.service';
import {numbersRegex} from '../../../../utils/regex';
import {Router} from '@angular/router';
import {Option} from '../../../../interfaces/forms/steps';
import {Button} from 'primeng/button';
import {NgForOf, UpperCasePipe} from '@angular/common';
import {CartService} from '../../../../services/cart/cart.service';
import {TranslatePipe} from '@ngx-translate/core';
import {isFormValid} from '../../../../utils/functions';
import {myInput} from '../../../../primeng/input';
import {myIcon} from '../../../../primeng/icon';

@Component({
  selector: 'app-checkout-step-four-how',
  imports: [
    Button,
    TranslatePipe,
    UpperCasePipe,
    ReactiveFormsModule,
    IconField,
    InputIcon,
    InputText,
    NgForOf,
    FormsModule
  ],
  templateUrl: './step-four-how.component.html',
  styleUrl: './step-four-how.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepFourHowComponent implements OnInit {
  protected checkoutFormService = inject(CheckoutFormService);
  private cartService = inject(CartService);
  private router = inject(Router);
  paymentOptions: Option[] = [
    {code: "0", description: "form.select.payment.method.card"},
    {code: "1", description: "form.select.payment.method.cash"}
  ];
  changeOptions: Option[] = [
    {code: "0", description: "prompt.no"},
    {code: "1", description: "prompt.yes"}
  ];
  selectedChangeOption: Option = this.changeOptions[0];


  ngOnInit(): void {
    this.checkoutFormService.step = 3;

    // if data was previously set, restore
    if (this.checkoutFormService.how !== null) {
      // is cash was selected
      if (this.checkoutFormService.how.paymentMethod !== this.paymentOptions[0].description) {
        // selected option is 'Cash'
        this.form.controls.paymentMethod.patchValue(this.paymentOptions[1].code);

        // show select for bill to change request
        this.checkoutFormService.cashPayment = true;

        // if bill to change was selected
        if (this.checkoutFormService.how.billToChange !== null) {
          // selected option is 'Yes'
          this.selectedChangeOption = this.changeOptions[1];
          // set the previously selected bill to change
          this.form.controls.billToChange.patchValue(this.checkoutFormService.how.billToChange.toString());
          // show input
          this.checkoutFormService.changeRequested = true;
        }
      }
    }
  }

  form = new FormGroup({
    paymentMethod: new FormControl(this.paymentOptions[0].code, {
      validators: [Validators.required],
      nonNullable: true,
      updateOn: "blur"
    }),
    billToChange: new FormControl<string | null>(null, {
      updateOn: "blur",
      validators: [billValidator(this.cartService.total, this.cartService.totalAfterOffers)]
    }),
  });

  togglePaymentOption(eventTarget: EventTarget) {
    const value = (eventTarget as HTMLSelectElement).value;
    if (value === this.paymentOptions[0].code) {
      this.checkoutFormService.cashPayment = false;
      this.hideChangeRequest();
    } else {
      this.checkoutFormService.cashPayment = true;
    }
  }

  toggleChangeRequest(eventTarget: EventTarget) {
    const value = (eventTarget as HTMLSelectElement).value;
    if (value === this.changeOptions[1].code) {
      this.form.controls.billToChange.reset();
      this.form.controls.billToChange.addValidators([Validators.required, Validators.pattern(numbersRegex)]);
      this.checkoutFormService.changeRequested = true;
    } else {
      this.hideChangeRequest();
    }
  }

  private hideChangeRequest() {
    this.form.controls.billToChange.reset();
    this.form.controls.billToChange.setErrors(null);
    this.form.controls.billToChange.removeValidators([Validators.required, Validators.pattern(numbersRegex)]);
    this.checkoutFormService.changeRequested = false;
  }

  private saveFormValues() {
    this.checkoutFormService.how = {
      paymentMethod: getPaymentOption(this.form.get("paymentMethod")!.value, this.paymentOptions),
      billToChange: this.form.get("billToChange")!.value === null ? null : Number(this.form.get("billToChange")!.value),
    };
  }

  previousStep() {
    this.router.navigate(['order', 'new', 'step-three']);
    this.checkoutFormService.cashPayment = false;
    this.checkoutFormService.changeRequested = false;
  }

  nextStep() {
    if (isFormValid(this.form)) {
      this.saveFormValues();
      this.router.navigate(['order', 'new', 'step-five']);
    }
  }

  cancel() {
    this.checkoutFormService.clear();
    this.router.navigate(['/']);
  }

  firstStep() {
    this.router.navigate(['order', 'new', 'step-one']);
  }

  protected readonly myInput = myInput;
  protected readonly myIcon = myIcon;
}

function billValidator(total: number, totalWithOffers: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    if (control.value !== null) {
      let invalid;

      if (totalWithOffers !== 0) {
        invalid = control.value <= totalWithOffers;
      } else {
        invalid = control.value <= total;
      }

      return invalid ? {valid: {value: control.value}} : null;
    }

    return null;
  };
}

function getPaymentOption(code: string, options: Option[]): string {
  const index = options.findIndex(option => option.code === code);
  return options[index].description;
}
