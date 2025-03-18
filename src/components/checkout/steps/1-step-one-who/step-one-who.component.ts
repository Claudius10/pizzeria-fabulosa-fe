import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {emailRgx, numbersRegex} from '../../../../utils/regex';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {Button} from 'primeng/button';
import {CheckoutFormService} from '../../../../services/checkout/checkout-form.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth/auth.service';
import {Card} from 'primeng/card';
import {TranslatePipe} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';
import {isFormValid} from '../../../../utils/functions';
import {InputText} from 'primeng/inputtext';
import {UserDetailsComponent} from "../../../user/details/user-details.component";
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
  protected checkoutFormService = inject(CheckoutFormService);
  protected authService = inject(AuthService);
  private router = inject(Router);

  form = new FormGroup({
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
    this.checkoutFormService.step = 0;

    // restore previously set values
    if (this.checkoutFormService.who !== null) {
      this.form.setValue({
        fullName: this.checkoutFormService.who.name,
        email: this.checkoutFormService.who.email,
        contactNumber: this.checkoutFormService.who.contactNumber.toString()
      });
    }

    if (!this.authService.isAuthenticated) {
      this.form.controls.fullName.addValidators([Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
      this.form.controls.email.addValidators([Validators.required, Validators.pattern(emailRgx)]);
      this.form.controls.contactNumber.addValidators([Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(numbersRegex)]);
    }
  }

  nextStep() {
    if (isFormValid(this.form)) {
      this.checkoutFormService.who = {
        name: this.form.get("fullName")!.value,
        contactNumber: Number(this.form.get("contactNumber")!.value),
        email: this.form.get("email")!.value,
      };

      this.router.navigate(['order', 'new', 'step-two']);
    }
  }

  cancel() {
    this.checkoutFormService.clear();
    this.router.navigate(['/']);
  }

  protected readonly myInput = myInput;
  protected readonly myIcon = myIcon;
}
