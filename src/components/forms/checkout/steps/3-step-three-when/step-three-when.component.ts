import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CheckoutFormService} from '../../../../../services/checkout/checkout-form.service';
import {timer} from 'rxjs';
import {Router} from '@angular/router';
import {Option} from '../../../../../interfaces/forms/steps';
import {Button} from 'primeng/button';
import {NgForOf, UpperCasePipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {isFormValid} from '../../../../../utils/functions';
import {formIconColor} from '../../../../../primeng/icon';
import {myInput} from '../../../../../primeng/input';

@Component({
  selector: 'app-checkout-step-three-when',
  imports: [
    TranslatePipe,
    Button,
    UpperCasePipe,
    ReactiveFormsModule,
    IconFieldModule,
    InputIconModule,
    FormsModule,
    NgForOf,
    InputTextModule
  ],
  templateUrl: './step-three-when.component.html',
  styleUrl: './step-three-when.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepThreeWhenComponent implements OnInit {
  protected checkoutFormService = inject(CheckoutFormService);
  private onDestroy = inject(DestroyRef);
  private router = inject(Router);
  programmedDelivery = this.checkoutFormService.programmedDelivery.asReadonly();
  deliveryHours = signal<string[]>(this.checkoutFormService.getDeliveryHours());
  options: Option[] = [
    {code: "0", description: "form.select.time.asap"},
    {
      code: "1", description: "form.select.time.programmed"
    }];
  selectedOption: Option = this.options[0];

  ngOnInit(): void {
    this.checkoutFormService.step.set(2);

    const sub = timer(0, 300000).subscribe({
      next: () => {
        if (this.programmedDelivery()) {
          this.deliveryHours.set(this.checkoutFormService.getDeliveryHours());
        }
      }
    });
    this.onDestroy.onDestroy(() => {
      sub.unsubscribe();

    });

    if (this.checkoutFormService.when() !== null) {
      if (this.checkoutFormService.when()!.deliveryTime !== this.options[0].description) {

        this.selectedOption = this.options[1];

        this.form.setValue({
          deliveryTime: this.checkoutFormService.when()!.deliveryTime,
        });
      }
    }
  }

  form = new FormGroup({
    deliveryTime: new FormControl(this.options[0].description, {
      validators: [Validators.required, Validators.minLength(4)],
      nonNullable: true,
      updateOn: "blur"
    }),
  });

  selectDeliveryChoice(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement.value === this.options[0].code) {
      this.form.controls.deliveryTime.setValue(this.options[0].description);
      this.checkoutFormService.programmedDelivery.set(false);
    } else {
      this.form.controls.deliveryTime.setValue("");
      this.checkoutFormService.programmedDelivery.set(true);
    }
  }

  saveFormValues() {
    this.checkoutFormService.when.set({
      deliveryTime: this.form.get("deliveryTime")!.value
    });
  }

  previousStep() {
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

  protected readonly formIconColor = formIconColor;
  protected readonly myInput = myInput;
}
