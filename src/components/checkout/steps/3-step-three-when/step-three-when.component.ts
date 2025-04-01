import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CheckoutFormService} from '../../../../services/checkout/checkout-form.service';
import {Router} from '@angular/router';
import {Option} from '../../../../utils/interfaces/forms/steps';
import {Button} from 'primeng/button';
import {NgForOf, UpperCasePipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {isFormValid} from '../../../../utils/functions';
import {myInput} from '../../../../primeng/input';
import {myIcon} from '../../../../primeng/icon';
import {QueryResult} from '../../../../utils/interfaces/query';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {RESOURCE_LOCAL_DATE_TIME_NOW} from '../../../../utils/query-keys';
import {lastValueFrom} from 'rxjs';
import {ResourcesHttpService} from '../../../../services/http/resources/resources-http.service';
import {toObservable} from '@angular/core/rxjs-interop';
import {SUCCESS} from '../../../../utils/constants';
import {ResponseDTO} from '../../../../utils/interfaces/http/api';
import {ErrorService} from '../../../../services/error/error.service';

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
  private resourceService = inject(ResourcesHttpService);
  private errorService = inject(ErrorService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  protected deliveryHours: string[] = [];
  protected options: Option[] = [
    {code: "0", description: "form.select.time.asap"},
    {code: "1", description: "form.select.time.programmed"}
  ];
  protected selectedOption: Option = this.options[0];

  private localDateTimeNow: QueryResult = injectQuery(() => ({
    queryKey: RESOURCE_LOCAL_DATE_TIME_NOW,
    queryFn: () => lastValueFrom(this.resourceService.findNow()),
    staleTime: 0
  }));

  private status = toObservable(this.localDateTimeNow.status);

  ngOnInit(): void {
    const subscription = this.status.subscribe({
      next: status => {
        if (status === SUCCESS) {

          const response: ResponseDTO = this.localDateTimeNow.data()!;

          if (response.status.error && response.error) {
            this.errorService.handleError(response.error);
          } else {
            this.deliveryHours = this.checkoutFormService.getDeliveryHours(this.localDateTimeNow.data()!.payload);
          }
        }
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

    this.checkoutFormService.step = 2;
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

  protected form = new FormGroup({
    deliveryTime: new FormControl(this.options[0].description, {
      validators: [Validators.required, Validators.minLength(4)],
      nonNullable: true,
      updateOn: "change"
    }),
  });

  protected selectDeliveryChoice(event: Event) {
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

  protected previousStep() {
    if (this.form.controls.deliveryTime.invalid) {
      this.checkoutFormService.programmedDelivery = false;
      this.checkoutFormService.when = null;
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

  protected readonly myInput = myInput;
  protected readonly myIcon = myIcon;
}
