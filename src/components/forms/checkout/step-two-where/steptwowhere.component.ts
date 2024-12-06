import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {StoreCheckoutComponent} from '../store/store-checkout.component';
import {CheckoutFormService} from '../../../../services/forms/checkout/checkout-form.service';
import {esCharsAndNumbersRegex, esCharsRegex, numbersRegex} from '../../../../regex';
import {ResourceService} from '../../../../services/http/resources/resource.service';
import {StoresQueryResult} from '../../../../interfaces/query';
import {RESOURCE_STORES} from '../../../../utils/query-keys';
import {Router} from '@angular/router';
import {isStepValid} from '../../../../utils/functions';

interface Option {
  code: number;
  description: string;
}

@Component({
  selector: 'app-checkout-step-two-where',
  standalone: true,
  imports: [
    Button,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ReactiveFormsModule,
    StoreCheckoutComponent,
    FormsModule
  ],
  templateUrl: './steptwowhere.component.html',
  styleUrl: './steptwowhere.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepTwoWhereComponent implements OnInit {
  protected checkoutFormService = inject(CheckoutFormService);
  private resourceService = inject(ResourceService);
  private router = inject(Router);
  stores: StoresQueryResult = this.resourceService.findStores({queryKey: RESOURCE_STORES});
  options: Option[] = [{code: 0, description: "Home delivery"}, {code: 1, description: "Store pickup"}];
  option: Option = {code: 0, description: "Home delivery"};

  form = new FormGroup({
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

  ngOnInit(): void {
    this.checkoutFormService.step.set(1);
    // if store was selected
    if (this.checkoutFormService.selectedStore() !== null) {
      // set store id
      this.form.patchValue({id: this.checkoutFormService.selectedStore()});
      // display stores
      this.checkoutFormService.homeDelivery.set(false);
      // select pickup option of HTMLSelectElement
      this.option = this.options[1];
    } else {
      if (this.checkoutFormService.where() !== null) {
        this.form.patchValue({
          street: this.checkoutFormService.where()!.street,
          number: this.checkoutFormService.where()!.number!.toString(),
          details: this.checkoutFormService.where()!.details
        });
      }
    }
  }

  selectDelivery(event: Event) {
    const selectElement = event.target as HTMLSelectElement;

    if (selectElement.value === "0") {
      this.checkoutFormService.homeDelivery.set(true);
      this.checkoutFormService.selectedStore.set(null);
    } else {
      this.checkoutFormService.homeDelivery.set(false);
    }

    this.form.reset();
  }

  setSelectedStoreId(id: number) {
    this.checkoutFormService.selectedStore.set(id); // for border color change on select
    this.form.controls.id.setValue(id);

    this.form.controls.street.setValue("STORE_PICKUP");
    this.form.controls.street.setErrors(null);

    this.form.controls.number.setValue("0");
    this.form.controls.number.setErrors(null);
  }

  saveFormValues() {
    this.checkoutFormService.where.set({
      id: this.form.get("id")!.value === null ? null : this.form.get("id")!.value,
      street: this.form.get("street")!.value === null ? null : this.form.get("street")!.value,
      number: Number(this.form.get("number")!.value),
      details: this.form.get("details")!.value === null ? null : this.form.get("details")!.value,
    });
  }

  previousStep() {
    this.router.navigate(['/new-order/step-one']);
  }

  nextStep() {
    if (isStepValid(this.form)) {
      console.log(this.form.value);
      this.saveFormValues();
      this.router.navigate(['/new-order/step-three']);
    }
  }
}

const validateWhere: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const id = control.get("id");

  // if store pick up or home address selected
  if (id && id.value !== null) {
    return null;
  }

  return null;
};
