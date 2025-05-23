import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, Signal} from '@angular/core';
import {Button} from "primeng/button";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {StoreCheckoutComponent} from '../store/store-checkout.component';
import {AddressId, CheckoutFormService} from '../../../../services/checkout/checkout-form.service';
import {esCharsAndNumbersRegex, esCharsRegex, numbersRegex} from '../../../../utils/regex';
import {RESOURCE_STORES} from '../../../../utils/query-keys';
import {Router} from '@angular/router';
import {Option} from '../../../../utils/interfaces/steps';
import {NgForOf, UpperCasePipe} from '@angular/common';
import {AuthService} from '../../../../services/auth/auth.service';
import {UserAddressListViewComponent} from './user-address-list/user-address-list-view.component';
import {TranslatePipe} from '@ngx-translate/core';
import {ServerErrorComponent} from '../../../../app/routes/error/server-no-response/server-error.component';
import {toObservable} from '@angular/core/rxjs-interop';
import {ErrorService} from '../../../../services/error/error.service';
import {isFormValid} from '../../../../utils/functions';
import {LoadingAnimationService} from '../../../../services/animation/loading-animation.service';
import {myInput} from '../../../../primeng/input';
import {myIcon} from '../../../../primeng/icon';
import {ERROR} from '../../../../utils/constants';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {firstValueFrom} from 'rxjs';
import {ResourcesAPIService} from '../../../../api';

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
    NgForOf,
    UserAddressListViewComponent,
    ServerErrorComponent,
    StoreCheckoutComponent
  ],
  templateUrl: './step-two-where.component.html',
  styleUrl: './step-two-where.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepTwoWhereComponent implements OnInit {
  private loadingAnimationService = inject(LoadingAnimationService);
  protected checkoutFormService = inject(CheckoutFormService);
  private resourcesAPI = inject(ResourcesAPIService);
  protected authService = inject(AuthService);
  private errorService = inject(ErrorService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  protected isFetching: Signal<boolean> = this.loadingAnimationService.getIsLoading();

  protected stores = injectQuery(() => ({
    queryKey: RESOURCE_STORES,
    queryFn: () => firstValueFrom(this.resourcesAPI.findAllStores()),
    enabled: false
  }));

  private storesStatus = toObservable(this.stores.status);

  protected options: Option[] = [
    {code: "0", description: "form.select.address.home"},
    {code: "1", description: "form.select.address.pickup"}
  ];

  protected selectedOption: Option = this.options[0];
  protected validStoreOrAddressSelection = true;

  protected form = new FormGroup({
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
    // set up component
    this.checkoutFormService.step = 1;

    if (!this.authService.isAuthenticated()) {
      this.setHomeDeliveryValidators(true);
    }

    // if store or user home address was selected
    if (this.checkoutFormService.selectedAddress.id !== null) {
      // disable validators
      this.setHomeDeliveryValidators(false);

      if (!this.checkoutFormService.selectedAddress.isStore) {
        this.selectedOption = this.options[0];
      } else {
        this.checkoutFormService.homeDelivery = false;
        this.selectedOption = this.options[1];
      }

    } else {
      // restore previously set values
      if (this.checkoutFormService.homeDelivery) {
        this.selectedOption = this.options[0];

        if (this.checkoutFormService.where !== null) {
          this.form.patchValue({
            street: this.checkoutFormService.where.street!,
            number: this.checkoutFormService.where.number!.toString(),
            details: this.checkoutFormService.where.details
          });
        }

      } else {
        this.selectedOption = this.options[1];
      }
    }
  }

  protected selectDelivery(event: Event) {
    const selectElement = event.target as HTMLSelectElement;

    this.checkoutFormService.selectedAddress = {id: null, isStore: null}; // at this level takes into account a logged in user

    // if home delivery selected
    if (selectElement.value === this.options[0].code) {
      this.checkoutFormService.homeDelivery = true;

      if (this.authService.isAuthenticated()) {
        this.setHomeDeliveryValidators(false);
      } else {
        this.setHomeDeliveryValidators(true);
      }

    } else {
      // if store delivery selected
      this.fetchStores();
      this.checkoutFormService.homeDelivery = false;
      this.checkoutFormService.where = null;
      this.setHomeDeliveryValidators(false);
    }

    this.form.reset();
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

  protected setSelectedId(address: AddressId): void {
    this.checkoutFormService.selectedAddress = ({id: address.id, isStore: address.isStore});
    this.validStoreOrAddressSelection = true;
  }

  private saveFormValues() {
    this.checkoutFormService.where = {
      street: this.form.get("street")!.value,
      number: Number(this.form.get("number")!.value),
      details: this.form.get("details")!.value === null ? undefined : this.form.get("details")!.value!,
    };
  }

  previousStep() {
    if (this.checkoutFormService.homeDelivery && isFormValid(this.form)) {
      this.saveFormValues();
    }

    this.router.navigate(['order', 'new', 'step-one']);
  }

  protected nextStep() {
    if (this.authService.isAuthenticated()) {

      // if user home address selected, then next step
      if (this.checkoutFormService.selectedAddress.id !== null) {

        this.router.navigate(['order', 'new', 'step-three']);
      } else {
        // address not selected
        this.validStoreOrAddressSelection = false;
      }

    } else {

      if (this.checkoutFormService.homeDelivery) {

        if (isFormValid(this.form)) {
          this.saveFormValues();
          this.router.navigate(['order', 'new', 'step-three']);
        }

      } else {
        // if pick-up store selected, then next step
        if (this.checkoutFormService.selectedAddress.id !== null) {
          this.router.navigate(['order', 'new', 'step-three']);
        } else {
          // pick-up store not selected
          this.validStoreOrAddressSelection = false;
        }
      }
    }
  }

  protected cancel() {
    this.checkoutFormService.clear();
    this.router.navigate(['/']);
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

  protected readonly myInput = myInput;
  protected readonly myIcon = myIcon;
}
