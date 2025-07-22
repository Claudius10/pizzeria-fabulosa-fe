import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CheckoutFormService} from '../../../services/checkout/checkout-form.service';
import {Router} from '@angular/router';
import {Option} from '../../../../utils/interfaces/steps';
import {Button} from 'primeng/button';
import {NgForOf, UpperCasePipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {isFormValid} from '../../../../utils/functions';
import {myInput} from '../../../../primeng/input';
import {myIcon} from '../../../../primeng/icon';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {RESOURCE_LOCAL_DATE_TIME_NOW} from '../../../../utils/query-keys';
import {lastValueFrom} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {ERROR, SUCCESS} from '../../../../utils/constants';
import {ErrorService} from '../../../services/error/error.service';
import {UtilAPIService} from '../../../../api/public';

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
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly errorService = inject(ErrorService);
  private readonly utilAPI = inject(UtilAPIService);
  private readonly checkoutFormService = inject(CheckoutFormService);
  private readonly when = this.checkoutFormService.getWhen();
  protected readonly programmedDelivery = this.checkoutFormService.getProgrammedDelivery();
  private readonly localDateTimeNow = injectQuery(() => ({
    queryKey: RESOURCE_LOCAL_DATE_TIME_NOW,
    queryFn: () => lastValueFrom(this.utilAPI.getNowAccountingDST()),
    staleTime: 0
  }));
  private readonly status = toObservable(this.localDateTimeNow.status);
  protected readonly deliveryHours = signal<string[]>([]);
  protected readonly options = signal<Option[]>([
      {code: "0", description: "form.select.time.asap"},
      {code: "1", description: "form.select.time.programmed"}
    ]
  );
  protected readonly selectedOption = signal<Option>(this.options()[0]);
  protected readonly form = new FormGroup({
    deliveryTime: new FormControl(this.options()[0].description, {
      validators: [Validators.required, Validators.minLength(4)],
      nonNullable: true,
      updateOn: "change"
    }),
  });


  ngOnInit(): void {
    this.checkoutFormService.setStep(2);

    const subscription = this.status.subscribe({
      next: status => {
        if (status === ERROR) {
          this.errorService.handleError(this.localDateTimeNow.error()!);
        }

        if (status === SUCCESS) {
          this.deliveryHours.set(this.checkoutFormService.getDeliveryHours(this.localDateTimeNow.data()!));
        }
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

    // restore previously set values
    if (this.when() && this.when()!.deliveryTime !== this.options()[0].description) {
      this.selectedOption.set(this.options()[1]);
      this.checkoutFormService.setProgrammedDelivery(true);
      this.form.setValue({
        deliveryTime: this.when()!.deliveryTime,
      });
    }
  }

  protected selectDeliveryChoice(event: Event) {
    const selectElement = event.target as HTMLSelectElement;

    if (selectElement.value === this.options()[0].code) {
      this.form.controls.deliveryTime.setValue(this.options()[0].description);
      this.checkoutFormService.setProgrammedDelivery(false);
    } else {
      this.form.controls.deliveryTime.setValue("");
      this.checkoutFormService.setProgrammedDelivery(true);
    }
  }

  protected previousStep() {
    if (this.form.controls.deliveryTime.invalid) {
      this.checkoutFormService.setProgrammedDelivery(false);
      this.checkoutFormService.setWhen(null);
    } else {
      this.saveFormValues();
    }
    this.router.navigate(['order', 'new', 'step-two']);
  }

  protected nextStep() {
    if (isFormValid(this.form)) {
      this.saveFormValues();
      this.router.navigate(['order', 'new', 'step-four']);
    }
  }

  protected cancel() {
    this.checkoutFormService.clear();
    this.router.navigate(['/']);
  }

  protected firstStep() {
    this.router.navigate(['order', 'new', 'step-one']);
  }

  private saveFormValues() {
    this.checkoutFormService.setWhen({
      deliveryTime: this.form.get("deliveryTime")!.value
    });
  }

  protected checkStep() {
    return this.checkoutFormService.isStepFilled(2);
  }

  protected readonly myInput = myInput;
  protected readonly myIcon = myIcon;
}
