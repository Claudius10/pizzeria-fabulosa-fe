import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CheckoutFormService} from '../../../../../services/forms/checkout/checkout-form.service';
import {numbersRegex} from '../../../../../regex';
import {Router} from '@angular/router';
import {isStepValid} from '../../../../../utils/functions';
import {Option} from '../../../../../interfaces/forms/steps';
import {Button} from 'primeng/button';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-checkout-step-four-how',
  standalone: true,
  imports: [
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ReactiveFormsModule,
    Button,
    NgForOf,
    FormsModule
  ],
  templateUrl: './step-four-how.component.html',
  styleUrl: './step-four-how.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepFourHowComponent implements OnInit {
  protected checkoutFormService = inject(CheckoutFormService);
  private router = inject(Router);
  paymentOptions: Option[] = [{code: "0", description: "Card"}, {code: "1", description: "Cash"}];
  changeOptions: Option[] = [{code: "0", description: "No"}, {code: "1", description: "Yes"}];
  selectedChangeOption: Option = this.changeOptions[0];

  ngOnInit(): void {
    this.checkoutFormService.step.set(3);

    // if data was previously set
    if (this.checkoutFormService.how() !== null) {
      // is cash was selected
      if (this.checkoutFormService.how()!.paymentMethod !== this.paymentOptions[0].description) {
        // selected option is 'Cash'
        this.form.controls.paymentMethod.patchValue(this.paymentOptions[1].code);

        // if bill to change was selected
        if (this.checkoutFormService.how()!.billToChange !== null) {
          // selected option is 'Yes'
          this.selectedChangeOption = this.changeOptions[1];
          // set the previously selected bill to change
          this.form.controls.billToChange.patchValue(this.checkoutFormService.how()!.billToChange!.toString());
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
      updateOn: "blur"
    }),
  });

  togglePaymentOption(eventTarget: EventTarget) {
    const value = (eventTarget as HTMLSelectElement).value;
    if (value === this.paymentOptions[0].code) {
      this.checkoutFormService.cashPayment.set(false);
      this.hideChangeRequest();
    } else {
      this.checkoutFormService.cashPayment.set(true);
    }
  }

  toggleChangeRequest(eventTarget: EventTarget) {
    const value = (eventTarget as HTMLSelectElement).value;
    if (value === this.changeOptions[1].code) {
      this.form.controls.billToChange.reset();
      this.form.controls.billToChange.addValidators([Validators.required, Validators.pattern(numbersRegex)]);
      this.checkoutFormService.changeRequested.set(true);
    } else {
      this.hideChangeRequest();
    }
  }

  hideChangeRequest() {
    this.form.controls.billToChange.reset();
    this.form.controls.billToChange.setErrors(null);
    this.form.controls.billToChange.removeValidators([Validators.required, Validators.pattern(numbersRegex)]);
    this.checkoutFormService.changeRequested.set(false);
  }

  saveFormValues() {
    this.checkoutFormService.how.set({
      paymentMethod: getPaymentOption(this.form.get("paymentMethod")!.value, this.paymentOptions),
      billToChange: this.form.get("billToChange")!.value === null ? null : Number(this.form.get("billToChange")!.value),
    });
  }

  previousStep() {
    this.router.navigate(['/new-order/step-three']);
  }

  nextStep() {
    if (isStepValid(this.form)) {
      this.saveFormValues();
      this.router.navigate(['/new-order/step-five']);
    }
  }

  cancel() {
    this.checkoutFormService.cancel();
    this.router.navigate(['/']);
  }
}

function getPaymentOption(code: string, options: Option[]): string {
  const index = options.findIndex(option => option.code === code);
  return options[index].description;
}
