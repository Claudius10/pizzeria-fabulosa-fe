import {ChangeDetectionStrategy, Component, inject, OnInit, Signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {emailRgx, numbersRegex} from '../../../../../regex';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {Button} from 'primeng/button';
import {CheckoutFormService} from '../../../../../services/checkout/checkout-form.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../../services/auth/auth.service';
import {CardModule} from 'primeng/card';
import {TranslatePipe} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';
import {isFormValid} from '../../../../../utils/functions';
import {InputTextModule} from 'primeng/inputtext';
import {UserDetailsComponent} from "../../../../user/details/user-details.component";
import {myInput} from '../../../../../primeng/input';
import {myIcon} from '../../../../../primeng/icon';

@Component({
  selector: 'app-checkout-step-one-who',
  imports: [
    CardModule,
    TranslatePipe,
    Button,
    UpperCasePipe,
    ReactiveFormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    UserDetailsComponent
  ],
  templateUrl: './step-one-who.component.html',
  styleUrl: './step-one-who.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepOneWhoComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  protected checkoutFormService = inject(CheckoutFormService);
  isAuthenticated: Signal<boolean> = this.authService.getIsAuthenticated();

  form = new FormGroup({
    fullName: new FormControl("", {
      nonNullable: true,
      updateOn: "blur"
    }),
    email: new FormControl("", {
      nonNullable: true,
      updateOn: "blur"
    }),
    contactNumber: new FormControl("", {
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

    if (!this.isAuthenticated()) {
      this.form.controls.fullName.addValidators([Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
      this.form.controls.email.addValidators([Validators.required, Validators.pattern(emailRgx)]);
      this.form.controls.contactNumber.addValidators([Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(numbersRegex)]);
    }
  }

  nextStep() {
    if (isFormValid(this.form)) {
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

  protected readonly myInput = myInput;
  protected readonly myIcon = myIcon;
}
