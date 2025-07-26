import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {emailRgx, numbersRegex} from '../../../../utils/regex';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {Button} from 'primeng/button';
import {CheckoutFormService} from '../../../services/checkout/checkout-form.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {Card} from 'primeng/card';
import {TranslatePipe} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';
import {isFormValid} from '../../../../utils/functions';
import {InputText} from 'primeng/inputtext';
import {UserDetailsComponent} from "../../../users/user/details/user-details.component";
import {myInput} from '../../../../primeng/input';
import {myIcon} from '../../../../primeng/icon';

@Component({
  selector: 'app-checkout-step-one-who',
  imports: [
    Card,
    UserDetailsComponent,
    Button,
    TranslatePipe,
    UpperCasePipe,
    ReactiveFormsModule,
    IconField,
    InputIcon,
    InputText
  ],
  templateUrl: './step-one-who.component.html',
  styleUrl: './step-one-who.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepOneWhoComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly checkoutFormService = inject(CheckoutFormService);
  private readonly authService = inject(AuthService);
  private readonly who = this.checkoutFormService.getWho();
  protected readonly isAuthenticated = this.authService.getIsAuthenticated();

  protected readonly form = new FormGroup({
    fullName: new FormControl("", {
      nonNullable: true,
      updateOn: "change"
    }),
    email: new FormControl("", {
      nonNullable: true,
      updateOn: "change"
    }),
    contactNumber: new FormControl("", {
      nonNullable: true,
      updateOn: "change"
    }),
  });

  ngOnInit(): void {
    this.checkoutFormService.setStep(0);

    // restore previously set values
    if (this.who()) {
      this.form.setValue({
        fullName: this.who()!.anonCustomerName,
        email: this.who()!.anonCustomerEmail,
        contactNumber: this.who()!.anonCustomerContactNumber.toString()
      });
    }

    if (!this.isAuthenticated()) {
      this.form.controls.fullName.addValidators([Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
      this.form.controls.email.addValidators([Validators.required, Validators.pattern(emailRgx)]);
      this.form.controls.contactNumber.addValidators([Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(numbersRegex)]);
    }
  }

  protected nextStep() {
    if (isFormValid(this.form)) {

      this.checkoutFormService.setWho({
        anonCustomerName: this.form.get("fullName")!.value,
        anonCustomerContactNumber: Number(this.form.get("contactNumber")!.value),
        anonCustomerEmail: this.form.get("email")!.value,
      });

      this.router.navigate(['order', 'new', 'step-two']);
    }
  }

  protected cancel() {
    this.checkoutFormService.clear();
    this.router.navigate(['/']);
  }

  protected readonly myInput = myInput;
  protected readonly myIcon = myIcon;
}
