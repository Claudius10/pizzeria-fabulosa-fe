import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {PaginatorModule} from 'primeng/paginator';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CheckoutFormService} from '../../../../services/forms/checkout/checkout-form.service';
import {numbersRegex} from '../../../../regex';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout-step-four-how',
  standalone: true,
  imports: [
    Button,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './stepfourhow.component.html',
  styleUrl: './stepfourhow.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepFourHowComponent implements OnInit {
  protected checkoutFormService = inject(CheckoutFormService);
  private router = inject(Router);

  ngOnInit(): void {
    this.checkoutFormService.step.set(3);
  }

  form = new FormGroup({
    paymentMethod: new FormControl("Tarjeta", {
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
    if (value === "Tarjeta") {
      this.checkoutFormService.cashPayment.set(false);
      this.hideChangeRequest();
    } else {
      this.checkoutFormService.cashPayment.set(true);
    }
  }

  toggleChangeRequest(eventTarget: EventTarget) {
    const value = (eventTarget as HTMLSelectElement).value;
    if (value === "V") {
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

  saveFormValues() {
    this.checkoutFormService.how.set({
      paymentMethod: this.form.get("paymentMethod")!.value,
      billToChange: this.form.get("billToChange")!.value === null ? null : Number(this.form.get("billToChange")!.value),
    });
  }

  previousStep() {
    this.router.navigate(['/new-order/step-three']);
  }

  nextStep() {
    if (this.isStepValid()) {
      this.saveFormValues();
      this.router.navigate(['/new-order/step-five']);
    }
  }
}
