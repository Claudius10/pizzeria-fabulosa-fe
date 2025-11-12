import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {CheckoutFormService} from '../../../services/checkout/checkout-form.service';
import {Router} from '@angular/router';
import {RESOURCE_STORES, USER_ORDER_SUMMARY_LIST} from '../../../../utils/query-keys';
import {StoreCheckoutComponent} from '../store/store-checkout.component';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {esCharsAndNumbersAndBasicSymbolsRgx} from '../../../../utils/regex';
import {CartService} from '../../../services/cart/cart.service';
import {LoadingAnimationService} from '../../../services/animation/loading-animation.service';
import {AuthService} from '../../../services/auth/auth.service';
import {TranslatePipe} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';
import {ErrorService} from '../../../services/error/error.service';
import {isFormValid} from '../../../../utils/functions';
import {Textarea} from 'primeng/textarea';
import {UserDetailsComponent} from '../../../users/user/details/user-details.component';
import {injectMutation, injectQuery, QueryClient} from '@tanstack/angular-query-experimental';
import {firstValueFrom, lastValueFrom} from 'rxjs';
import {MyCartItemDTO} from '../../../../utils/interfaces/MyCartItemDTO';
import {AnonymousOrdersAPIService, CreatedOrderDTO, NewAnonOrderDTO, NewUserOrderDTO, UserOrdersAPIService} from '../../../../api/business';
import {Store, StoreAPIService} from '../../../../api/public';

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
  private readonly router = inject(Router);
  private readonly queryClient = inject(QueryClient);
  private readonly errorService = inject(ErrorService);
  private readonly loadingAnimationService = inject(LoadingAnimationService);
  private readonly checkoutFormService = inject(CheckoutFormService);
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly storesAPI = inject(StoreAPIService);
  private readonly anonymousOrdersAPI = inject(AnonymousOrdersAPIService);
  private readonly userOrdersAPI = inject(UserOrdersAPIService);
  private readonly userId = this.authService.getId();
  private readonly cartQuantity = this.cartService.getQuantity();
  private readonly cartItems = this.cartService.getItems();
  private readonly cartTotal = this.cartService.getTotal();
  private readonly cartTotalAfterOffers = this.cartService.getTotalAfterOffers();
  private readonly comment = this.checkoutFormService.getComment();
  protected readonly isAuthenticated = this.authService.getIsAuthenticated();
  protected readonly who = this.checkoutFormService.getWho();
  protected readonly where = this.checkoutFormService.getWhere();
  protected readonly when = this.checkoutFormService.getWhen();
  protected readonly how = this.checkoutFormService.getHow();
  protected readonly selectedStore = this.checkoutFormService.getSelectedStore();
  protected readonly store = signal<Store | null>(null);

  private readonly stores = injectQuery(() => ({
    queryKey: RESOURCE_STORES,
    queryFn: () => firstValueFrom(this.storesAPI.findAll()),
  }));

  private readonly createAnonOrder = injectMutation(() => ({
    mutationFn: (data: NewAnonOrderDTO) => lastValueFrom(this.anonymousOrdersAPI.createAnonOrder(data))
  }));

  private readonly createUserOrder = injectMutation(() => ({
    mutationFn: (data: { userId: number, order: NewUserOrderDTO }) => lastValueFrom(this.userOrdersAPI.create(data.userId, data.order)),
    onSuccess: () => {
      this.queryClient.refetchQueries({queryKey: USER_ORDER_SUMMARY_LIST});
    }
  }));

  protected readonly form = new FormGroup({
    comment: new FormControl<string | null>(null, {
      validators: [Validators.maxLength(150), Validators.pattern(esCharsAndNumbersAndBasicSymbolsRgx)],
      nonNullable: false,
      updateOn: "change"
    }),
  });

  ngOnInit(): void {
    this.checkoutFormService.setStep(4);

    if (this.checkStep()) {

      if (this.comment()) {
        this.form.controls.comment.patchValue(this.comment());
      }

      if (this.where() === null && this.selectedStore()) {
        const fetchedStores: Store[] = this.stores.data()!.stores; // NOTE - data is in cache
        const selectedStoreIndex = fetchedStores.findIndex(store => store.address === this.selectedStore());
        this.store.set(fetchedStores[selectedStoreIndex]);
      }
    }
  }

  protected onSubmit(): void {
    if (isFormValid(this.form)) {
      this.loadingAnimationService.startLoading();

      if (this.isAuthenticated()) {
        this.newUserOrder();
      } else {
        this.newAnonOrder();
      }
    }
  }

  protected previousStep() {
    if (isFormValid(this.form)) {
      this.checkoutFormService.setComment(this.form.get("comment")!.value);
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
        deliveryTime: this.when()!.deliveryTime,
        paymentMethod: this.how()!.paymentMethod,
        billToChange: this.how()!.billToChange === null ? undefined : this.how()!.billToChange,
        comment: this.form.get("comment")!.value === null ? undefined : this.form.get("comment")!.value!,
        storePickUp: this.selectedStore() !== null
      },
      cart: {
        cartItems: cleanIds(this.cartItems()),
        totalQuantity: this.cartQuantity(),
        totalCost: Number(this.cartTotal().toFixed(2)),
        totalCostOffers: Number(this.cartTotalAfterOffers().toFixed(2)),
      }
    };

    this.createUserOrder.mutate({userId: this.userId()!, order: payload}, {
      onSuccess: (response: CreatedOrderDTO) => {
        this.cartService.clear();
        this.checkoutFormService.clear();
        this.checkoutFormService.setOrderSuccess(response);
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
        anonCustomerName: this.who()!.anonCustomerName,
        anonCustomerContactNumber: this.who()!.anonCustomerContactNumber,
        anonCustomerEmail: this.who()!.anonCustomerEmail,
      },
      address: this.resolveAddress(),
      orderDetails: {
        deliveryTime: this.when()!.deliveryTime,
        paymentMethod: this.how()!.paymentMethod,
        billToChange: this.how()!.billToChange === null ? undefined : this.how()!.billToChange,
        comment: this.form.get("comment")!.value === null ? undefined : this.form.get("comment")!.value!,
        storePickUp: this.selectedStore() !== null
      },
      cart: {
        cartItems: cleanIds(this.cartItems()),
        totalQuantity: this.cartQuantity(),
        totalCost: Number(this.cartTotal().toFixed(2)),
        totalCostOffers: Number(this.cartTotalAfterOffers().toFixed(2)),
      }
    };

    this.createAnonOrder.mutate(payload, {
      onSuccess: (response: CreatedOrderDTO) => {
        this.cartService.clear();
        this.checkoutFormService.clear();
        this.checkoutFormService.setOrderSuccess(response);
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
    if (this.selectedStore()) {
      address = this.selectedStore()!;
    } else if (this.where()) {
      address = this.where()!.street + " " + this.where()!.number.toString();
      if (this.where()!.details) {
        address = address + " " + this.where()!.details;
      }
    }
    return address;
  }

  protected isCartEmpty() {
    return this.cartService.isEmpty();
  }

  protected checkStep() {
    return this.checkoutFormService.isStepFilled(4);
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
