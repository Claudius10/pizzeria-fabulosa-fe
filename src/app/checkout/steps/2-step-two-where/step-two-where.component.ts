import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, Signal} from '@angular/core';
import {Button} from "primeng/button";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {StoreCheckoutComponent} from '../store/store-checkout.component';
import {esCharsAndNumbersRegex, esCharsRegex, numbersRegex} from '../../../../utils/regex';
import {RESOURCE_STORES} from '../../../../utils/query-keys';
import {Router} from '@angular/router';
import {Option} from '../../../../utils/interfaces/steps';
import {UpperCasePipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {ServerErrorComponent} from '../../../routes/error/server-no-response/server-error.component';
import {toObservable} from '@angular/core/rxjs-interop';
import {ErrorService} from '../../../services/error/error.service';
import {isFormValid} from '../../../../utils/functions';
import {LoadingAnimationService} from '../../../services/animation/loading-animation.service';
import {myInput} from '../../../../primeng/input';
import {myIcon} from '../../../../primeng/icon';
import {ERROR} from '../../../../utils/constants';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {firstValueFrom} from 'rxjs';
import {CheckoutFormService} from '../../../services/checkout/checkout-form.service';
import {StoreAPIService} from '../../../../api/public';

@Component({
  selector: 'app-checkout-step-two-where',
  imports: [
    TranslatePipe,
    UpperCasePipe,
    Button,
    ReactiveFormsModule,
    IconField,
    InputIcon,
    FormsModule,
    InputText,
    ServerErrorComponent,
    StoreCheckoutComponent,
  ],
  templateUrl: './step-two-where.component.html',
  styleUrl: './step-two-where.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepTwoWhereComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly errorService = inject(ErrorService);
  private readonly storeAPI = inject(StoreAPIService);
  private readonly loadingAnimationService = inject(LoadingAnimationService);
  private readonly checkoutFormService = inject(CheckoutFormService);
  private readonly where = this.checkoutFormService.getWhere();
  protected readonly homeDelivery = this.checkoutFormService.getHomeDelivery();
  protected readonly selectedStore = this.checkoutFormService.getSelectedStore();

  protected readonly stores = injectQuery(() => ({
    queryKey: RESOURCE_STORES,
    queryFn: () => firstValueFrom(this.storeAPI.findAll()),
    enabled: false
  }));

  private readonly storesStatus = toObservable(this.stores.status);
  protected readonly isFetching: Signal<boolean> = this.loadingAnimationService.getIsLoading();

  protected readonly options = signal<Option[]>([
    {code: "0", description: "form.select.address.home"},
    {code: "1", description: "form.select.address.pickup"}
  ]);

  protected readonly selectedOption = signal<Option>(this.options()[0]);
  protected readonly validStoreOrAddressSelection = signal(true);

  protected readonly form = new FormGroup({
    street: new FormControl("", {
        nonNullable: true,
        updateOn: "change"
      }
    ),
    number: new FormControl("", {
        nonNullable: true,
        updateOn: "change"
      }
    ),
    details: new FormControl<string | null>(null, {
      validators: [Validators.pattern(esCharsAndNumbersRegex)],
      nonNullable: false,
      updateOn: "change"
    }),
  });

  ngOnInit(): void {
    this.checkoutFormService.setStep(1);
    this.setHomeDeliveryValidators(true);

    // if store was selected
    if (this.selectedStore()) {
      this.setHomeDeliveryValidators(false);
      this.checkoutFormService.setHomeDelivery(false);
      this.selectedOption.set(this.options()[1]);
    } else {
      // home delivery
      if (this.homeDelivery()) {
        this.selectedOption.set(this.options()[0]);

        if (this.where()) {
          this.form.patchValue({
            street: this.where()!.street,
            number: this.where()!.number.toString(),
            details: this.where()!.details
          });
        }
      } else {
        this.selectedOption.set(this.options()[1]);
      }
    }
  }

  protected previousStep() {
    if (this.homeDelivery() && isFormValid(this.form)) {
      this.saveFormValues();
    }

    this.router.navigate(['order', 'new', 'step-one']);
  }

  protected selectDelivery(event: Event) {
    const selectElement = event.target as HTMLSelectElement;

    // if home delivery selected
    if (selectElement.value === this.options()[0].code) {
      this.checkoutFormService.setHomeDelivery(true);
      this.checkoutFormService.setSelectedStore(null);
      this.setHomeDeliveryValidators(true);
    } else {
      // if store delivery selected
      this.fetchStores();
      this.checkoutFormService.setHomeDelivery(false);
      this.checkoutFormService.setWhere(null);
      this.setHomeDeliveryValidators(false);
    }

    this.form.reset();
  }

  protected setSelectedStore(store: string): void {
    this.checkoutFormService.setSelectedStore(store);
    this.validStoreOrAddressSelection.set(true);
  }

  protected nextStep() {
    if (this.homeDelivery()) {
      if (isFormValid(this.form)) {
        this.saveFormValues();
        this.router.navigate(['order', 'new', 'step-three']);
      }

    } else {
      // if pick-up store selected, then next step
      if (this.selectedStore()) {
        this.router.navigate(['order', 'new', 'step-three']);
      } else {
        // pick-up store not selected
        this.validStoreOrAddressSelection.set(false);
      }
    }
  }

  protected cancel() {
    this.checkoutFormService.clear();
    this.router.navigate(['/']);
  }

  private fetchStores() {
    this.loadingAnimationService.startLoading();
    this.stores.refetch(); // no need to handle promise here

    const subscription = this.storesStatus.subscribe({
      next: status => {
        if (status === ERROR) {
          this.errorService.handleError(this.stores.error()!);
        }

        this.loadingAnimationService.stopLoading();
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  private saveFormValues() {
    this.checkoutFormService.setWhere({
      street: this.form.get("street")!.value,
      number: Number(this.form.get("number")!.value),
      details: this.form.get("details")!.value === null ? undefined : this.form.get("details")!.value!,
    });
  }

  private setHomeDeliveryValidators(add: boolean): void {
    if (add) {
      this.form.controls.street.addValidators([Validators.required, Validators.maxLength(52), Validators.pattern(esCharsRegex)]);
      this.form.controls.number.addValidators([Validators.required, Validators.maxLength(4), Validators.pattern(numbersRegex)]);
    } else {
      this.form.controls.street.removeValidators([Validators.required, Validators.maxLength(52), Validators.pattern(esCharsRegex)]);
      this.form.controls.number.removeValidators([Validators.required, Validators.maxLength(4), Validators.pattern(numbersRegex)]);
    }
  }

  protected checkStep() {
    return this.checkoutFormService.isStepFilled(1);
  }

  protected readonly myInput = myInput;
  protected readonly myIcon = myIcon;
}
