import {ChangeDetectionStrategy, Component, inject, output} from '@angular/core';
import {Button} from "primeng/button";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {StoreCheckoutComponent} from '../store/store-checkout.component';
import {CheckoutFormService} from '../../../../services/forms/checkout/checkout-form.service';
import {esCharsAndNumbersRegex, esCharsRegex, numbersRegex} from '../../../../regex';
import {AddressFormData} from '../../../../interfaces/forms/order';
import {ResourceService} from '../../../../services/http/resources/resource.service';
import {StoresQueryResult} from '../../../../interfaces/query';
import {RESOURCE_STORES} from '../../../../utils/query-keys';

@Component({
  selector: 'app-checkout-step-two-where',
  standalone: true,
  imports: [
    Button,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ReactiveFormsModule,
    StoreCheckoutComponent
  ],
  templateUrl: './steptwowhere.component.html',
  styleUrl: './steptwowhere.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepTwoWhereComponent {
  protected checkoutFormService = inject(CheckoutFormService);
  private resourceService = inject(ResourceService);
  formValues = output<AddressFormData>();
  stores: StoresQueryResult = this.resourceService.findStores({queryKey: RESOURCE_STORES});

  form = new FormGroup({
    storeId: new FormControl<number | null>(null),
    id: new FormControl<number | null>(null),
    street: new FormControl("", {
        validators: [Validators.required, Validators.maxLength(52), Validators.pattern(esCharsRegex)],
        nonNullable: false,
        updateOn: "blur"
      }
    ),
    number: new FormControl("", {
        validators: [Validators.required, Validators.maxLength(10), Validators.pattern(numbersRegex)],
        nonNullable: false,
        updateOn: "blur"
      }
    ),
    details: new FormControl("", {
      validators: [Validators.pattern(esCharsAndNumbersRegex)],
      nonNullable: false,
      updateOn: "blur"
    }),
  }, {validators: [validateWhere]});

  selectDelivery(event: Event) {
    const selectElement = event.target as HTMLSelectElement;

    if (selectElement.value === "home") {
      this.checkoutFormService.homeDelivery.set(true);
      this.checkoutFormService.selectedStore.set(null);
    } else {
      this.checkoutFormService.homeDelivery.set(false);
    }

    this.form.reset();
  }

  setSelectedStoreId(id: number) {
    this.form.controls.storeId.setValue(id);

    this.form.controls.street.setValue("STORE_PICKUP_SELECTED");
    this.form.controls.street.setErrors(null);

    this.form.controls.number.setValue("0");
    this.form.controls.number.setErrors(null);

    this.checkoutFormService.selectedStore.set(id);
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

  emit() {
    this.formValues.emit({
      id: this.form.get("storeId")!.value === null ? null : this.form.get("storeId")!.value,
      street: this.form.get("street")!.value === null ? null : this.form.get("street")!.value,
      streetNr: Number(this.form.get("number")!.value),
      gate: null,
      staircase: null,
      floor: null,
      door: this.form.get("details")!.value === null ? null : this.form.get("details")!.value,
    });
  }

  previousStep() {
    this.checkoutFormService.previousStep();
    this.emit();
  }

  nextStep() {
    if (this.isStepValid()) {
      this.checkoutFormService.nextStep();
      this.emit();
    }
  }
}

const validateWhere: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const storeId = control.get("storeId");
  const id = control.get("id");

  // if pick up store is selected
  if (storeId && storeId.value !== null) {
    return null;
  }

  // if user selected home address
  if (id && id.value !== null) {
    return null;
  }

  return null;
};
