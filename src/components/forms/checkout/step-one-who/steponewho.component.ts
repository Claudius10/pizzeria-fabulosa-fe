import {ChangeDetectionStrategy, Component, inject, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {emailRgx, numbersRegex} from '../../../../regex';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {AnonCustomerData} from '../../../../interfaces/forms/order';
import {Button} from 'primeng/button';
import {CheckoutFormService} from '../../../../services/forms/checkout/checkout-form.service';

@Component({
  selector: 'app-checkout-step-one-who',
  standalone: true,
  imports: [
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ReactiveFormsModule,
    Button
  ],
  templateUrl: './steponewho.component.html',
  styleUrl: './steponewho.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepOneWhoComponent {
  protected checkoutFormService = inject(CheckoutFormService);
  formValues = output<AnonCustomerData>();

  form = new FormGroup({
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
  });

  isStepValid() {
    const valid = this.form.valid;

    if (!valid) {
      Object.keys(this.form.controls).forEach(controlName => {
        const control = this.form.get(`${controlName}`);
        if (!control!.valid) {
          control!.markAsTouched();
        } else {
          control!.markAsUntouched();
        }
      });
    }

    return valid;
  }

  nextStep() {
    if (this.isStepValid()) {
      this.checkoutFormService.nextStep();
      this.formValues.emit({
        anonCustomerName: this.form.get("fullName")!.value,
        anonCustomerContactNumber: Number(this.form.get("contactNumber")!.value),
        anonCustomerEmail: this.form.get("email")!.value,
      });
    }
  }
}
