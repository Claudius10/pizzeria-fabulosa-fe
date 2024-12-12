import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {emailRgx, numbersRegex} from '../../../../../regex';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {CheckoutFormService} from '../../../../../services/forms/checkout/checkout-form.service';
import {Router} from '@angular/router';
import {isStepValid} from '../../../../../utils/functions';

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
  templateUrl: './step-one-who.component.html',
  styleUrl: './step-one-who.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepOneWhoComponent implements OnInit {
  protected checkoutFormService = inject(CheckoutFormService);
  private router = inject(Router);

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

  ngOnInit(): void {
    this.checkoutFormService.step.set(0);

    if (this.checkoutFormService.who() !== null) {
      this.form.setValue({
        fullName: this.checkoutFormService.who()!.name,
        email: this.checkoutFormService.who()!.email,
        contactNumber: this.checkoutFormService.who()!.contactNumber.toString()
      });
    }
  }

  nextStep() {
    if (isStepValid(this.form)) {

      this.checkoutFormService.who.set({
        name: this.form.get("fullName")!.value,
        contactNumber: Number(this.form.get("contactNumber")!.value),
        email: this.form.get("email")!.value,
      });

      this.router.navigate(['order', 'new', 'step-two']);
    }
  }

  cancel() {
    this.checkoutFormService.clear();
    this.router.navigate(['/']);
  }
}
