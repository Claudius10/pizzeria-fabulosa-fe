import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CheckoutFormService} from '../../../../services/checkout/checkout-form.service';
import {Router} from '@angular/router';
import {Option} from '../../../../interfaces/forms/steps';
import {Button} from 'primeng/button';
import {NgForOf, UpperCasePipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {isFormValid} from '../../../../utils/functions';
import {myInput} from '../../../../primeng/input';
import {myIcon} from '../../../../primeng/icon';

@Component({
  selector: 'app-checkout-step-three-when',
  imports: [
    TranslatePipe,
    UpperCasePipe,
    Button,
    ReactiveFormsModule,
    IconField,
    InputIcon,
    FormsModule,
    InputText,
    NgForOf
  ],
  templateUrl: './step-three-when.component.html',
  styleUrl: './step-three-when.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepThreeWhenComponent implements OnInit {
  protected checkoutFormService = inject(CheckoutFormService);
  private router = inject(Router);
  deliveryHours: string[] = this.checkoutFormService.getDeliveryHours();
  options: Option[] = [
    {code: "0", description: "form.select.time.asap"},
    {code: "1", description: "form.select.time.programmed"}
  ];
  selectedOption: Option = this.options[0];

  ngOnInit(): void {
    this.checkoutFormService.step = 2;

    // BUG - timer makes refreshing page bug out TypeError [ERR_INVALID_ARG_TYPE]: The "str" argument must be of type string. Received undefined
    // // every 5 minutes reset delivery hours
    // const sub = timer(0, 300000).subscribe({
    //   next: (value) => {
    //     // if (this.checkoutFormService.programmedDelivery) {
    //     //   this.deliveryHours = this.checkoutFormService.getDeliveryHours();
    //     // }
    //   }
    // });
    //
    // this.onDestroy.onDestroy(() => {
    //   sub.unsubscribe();
    // });

    // restore previously set values
    if (this.checkoutFormService.when !== null) {
      if (this.checkoutFormService.when.deliveryTime !== this.options[0].description) {

        this.selectedOption = this.options[1];
        this.checkoutFormService.programmedDelivery = true;

        this.form.setValue({
          deliveryTime: this.checkoutFormService.when.deliveryTime,
        });
      }
    }
  }

  form = new FormGroup({
    deliveryTime: new FormControl(this.options[0].description, {
      validators: [Validators.required, Validators.minLength(4)],
      nonNullable: true,
      updateOn: "change"
    }),
  });

  selectDeliveryChoice(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement.value === this.options[0].code) {
      this.form.controls.deliveryTime.setValue(this.options[0].description);
      this.checkoutFormService.programmedDelivery = false;
    } else {
      this.form.controls.deliveryTime.setValue("");
      this.checkoutFormService.programmedDelivery = true;
    }
  }

  private saveFormValues() {
    this.checkoutFormService.when = {
      deliveryTime: this.form.get("deliveryTime")!.value
    };
  }

  previousStep() {
    if (this.form.controls.deliveryTime.invalid) {
      this.checkoutFormService.programmedDelivery = false;
      this.checkoutFormService.when = null;
    } else {
      this.saveFormValues();
    }
    this.router.navigate(['order', 'new', 'step-two']);
  }

  nextStep() {
    if (isFormValid(this.form)) {
      this.saveFormValues();
      this.router.navigate(['order', 'new', 'step-four']);
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
