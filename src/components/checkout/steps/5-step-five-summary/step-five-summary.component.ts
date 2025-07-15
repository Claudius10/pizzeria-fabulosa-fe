import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CheckoutFormService} from '../../../../services/checkout/checkout-form.service';
import {Router} from '@angular/router';
import {RESOURCE_STORES, USER_ORDER_SUMMARY_LIST} from '../../../../utils/query-keys';
import {StoreCheckoutComponent} from '../store/store-checkout.component';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {esCharsAndNumbersAndBasicSymbolsRgx} from '../../../../utils/regex';
import {CartService} from '../../../../services/cart/cart.service';
import {LoadingAnimationService} from '../../../../services/animation/loading-animation.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {TranslatePipe} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';
import {ErrorService} from '../../../../services/error/error.service';
import {isFormValid} from '../../../../utils/functions';
import {Textarea} from 'primeng/textarea';
import {UserDetailsComponent} from '../../../user/details/user-details.component';
import {injectMutation, injectQuery, QueryClient} from '@tanstack/angular-query-experimental';
import {firstValueFrom, lastValueFrom} from 'rxjs';
import {MyCartItemDTO} from '../../../../utils/interfaces/MyCartItemDTO';
import {NewUserOrderDTO, UserOrdersAPIService} from '../../../../api/business';
import {AnonymousOrdersAPIService, CreatedOrderDTO, NewAnonOrderDTO, Store, StoreAPIService} from '../../../../api/public';

@Component({
  selector: 'app-step-five-summary',
  imports: [
    Button,
    TranslatePipe,
    UpperCasePipe,
    Card,
    UserDetailsComponent,
    StoreCheckoutComponent,
    ReactiveFormsModule,
    Textarea
  ],
  templateUrl: './step-five-summary.component.html',
  styleUrl: './step-five-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepFiveSummaryComponent implements OnInit {
  protected checkoutFormService = inject(CheckoutFormService);
  protected authService = inject(AuthService);
  protected cartService = inject(CartService);
  protected selectedStore: Store | null = null;
  protected form = new FormGroup({
    comment: new FormControl<string | null>(null, {
      validators: [Validators.maxLength(150), Validators.pattern(esCharsAndNumbersAndBasicSymbolsRgx)],
      nonNullable: false,
      updateOn: "change"
    }),
  });
  private loadingAnimationService = inject(LoadingAnimationService);
  private anonymousOrdersAPI = inject(AnonymousOrdersAPIService);
  private userOrdersAPI = inject(UserOrdersAPIService);
  private storesAPI = inject(StoreAPIService);
  private errorService = inject(ErrorService);
  private queryClient = inject(QueryClient);
  private router = inject(Router);
  private createAnonOrder = injectMutation(() => ({
    mutationFn: (data: NewAnonOrderDTO) => lastValueFrom(this.anonymousOrdersAPI.createAnonOrder(data))
  }));
  private createUserOrder = injectMutation(() => ({
    mutationFn: (data: { userId: number, order: NewUserOrderDTO }) => lastValueFrom(this.userOrdersAPI.create(data.userId, data.order)),
    onSuccess: () => {
      this.queryClient.refetchQueries({queryKey: USER_ORDER_SUMMARY_LIST});
    }
  }));
  private stores = injectQuery(() => ({
    queryKey: RESOURCE_STORES,
    queryFn: () => firstValueFrom(this.storesAPI.findAll()),
  }));

  ngOnInit(): void {
    this.checkoutFormService.step = 4;

    if (this.checkoutFormService.isStepFilled(4)) {

      if (this.checkoutFormService.comment !== null) {
        this.form.controls.comment.patchValue(this.checkoutFormService.comment);
      }

      if (this.checkoutFormService.where === null && this.checkoutFormService.selectedStore !== null) {
        const fetchedStores: Store[] = this.stores.data()!.stores; // NOTE - data is in cache
        const selectedStoreIndex = fetchedStores.findIndex(store => store.address === this.checkoutFormService.selectedStore);
        this.selectedStore = fetchedStores[selectedStoreIndex];
      }
    }
  }

  protected onSubmit(): void {
    if (isFormValid(this.form)) {
      this.loadingAnimationService.startLoading();

      if (this.authService.isAuthenticated()) {
        this.newUserOrder();
      } else {
        this.newAnonOrder();
      }
    }
  }

  protected previousStep() {
    if (isFormValid(this.form)) {
      this.checkoutFormService.comment = this.form.get("comment")!.value;
    }
    this.router.navigate(['order', 'new', 'step-four']);
  }

  protected cancel() {
    this.checkoutFormService.clear();
    this.router.navigate(['/']);
  }

  protected firstStep() {
    this.router.navigate(['order', 'new', 'step-one']);
  }

  private newUserOrder() {
    const payload: NewUserOrderDTO = {
      address: this.resolveAddress(),
      orderDetails: {
        deliveryTime: this.checkoutFormService.when!.deliveryTime,
        paymentMethod: this.checkoutFormService.how!.paymentMethod,
        billToChange: this.checkoutFormService.how!.billToChange === null ? undefined : this.checkoutFormService.how!.billToChange,
        comment: this.form.get("comment")!.value === null ? undefined : this.form.get("comment")!.value!,
        storePickUp: this.checkoutFormService.selectedStore !== null
      },
      cart: {
        cartItems: cleanIds(this.cartService.items()),
        totalQuantity: this.cartService.quantity(),
        totalCost: Number(this.cartService.total().toFixed(2)),
        totalCostOffers: Number(this.cartService.totalAfterOffers().toFixed(2)),
      }
    };

    this.createUserOrder.mutate({userId: this.authService.id!, order: payload}, {
      onSuccess: (response: CreatedOrderDTO) => {
        this.cartService.clear();
        this.checkoutFormService.clear();
        this.checkoutFormService.orderSuccess = response;
        this.router.navigate(['order', 'success']);
      },
      onError: (error) => {
        this.errorService.handleError(error);
      },
      onSettled: () => {
        this.loadingAnimationService.stopLoading();
      }
    });
  }

  private newAnonOrder() {

    const payload: NewAnonOrderDTO = {
      customer: {
        anonCustomerName: this.checkoutFormService.who!.anonCustomerName,
        anonCustomerContactNumber: this.checkoutFormService.who!.anonCustomerContactNumber,
        anonCustomerEmail: this.checkoutFormService.who!.anonCustomerEmail,
      },
      address: this.resolveAddress(),
      orderDetails: {
        deliveryTime: this.checkoutFormService.when!.deliveryTime,
        paymentMethod: this.checkoutFormService.how!.paymentMethod,
        billToChange: this.checkoutFormService.how!.billToChange,
        comment: this.form.get("comment")!.value === undefined ? undefined : this.form.get("comment")!.value!,
        storePickUp: this.checkoutFormService.selectedStore !== null
      },
      cart: {
        cartItems: cleanIds(this.cartService.items()),
        totalQuantity: this.cartService.quantity(),
        totalCost: Number(this.cartService.total().toFixed(2)),
        totalCostOffers: Number(this.cartService.totalAfterOffers().toFixed(2)),
      }
    };

    this.createAnonOrder.mutate(payload, {
      onSuccess: (response: CreatedOrderDTO) => {
        this.cartService.clear();
        this.checkoutFormService.clear();
        this.checkoutFormService.orderSuccess = response;
        this.router.navigate(['order', 'success']);
      },
      onError: (error) => {
        this.errorService.handleError(error);
      },
      onSettled: () => {
        this.loadingAnimationService.stopLoading();
      }
    });
  }

  private resolveAddress(): string {
    let address = "";
    if (this.checkoutFormService.selectedStore !== null) {
      address = this.checkoutFormService.selectedStore;
    } else if (this.checkoutFormService.where) {
      address = this.checkoutFormService.where.street + " " + this.checkoutFormService.where.number.toString();
      if (this.checkoutFormService.where.details) {
        address = address + " " + this.checkoutFormService.where.details;
      }
    }
    return address;
  }
}

function cleanIds(items: MyCartItemDTO[]) {
  const newItems: MyCartItemDTO[] = [];
  items.forEach((item) => {
    item.id = 1; // set as a number in string so JSON can deserialize the value to Long
    newItems.push(item);
  });
  return newItems;
}
