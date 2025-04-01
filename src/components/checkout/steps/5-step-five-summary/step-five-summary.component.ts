import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CheckoutFormService} from '../../../../services/checkout/checkout-form.service';
import {Router} from '@angular/router';
import {RESOURCE_STORES, USER_ADDRESS_LIST, USER_ORDER_SUMMARY_LIST} from '../../../../utils/query-keys';
import {StoreDTO} from '../../../../utils/interfaces/dto/resources';
import {StoreCheckoutComponent} from '../store/store-checkout.component';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {esCharsAndNumbersAndBasicSymbolsRgx} from '../../../../utils/regex';
import {CartService} from '../../../../services/cart/cart.service';
import {MutationRequest, MutationResult} from '../../../../utils/interfaces/mutation';
import {QueryResult} from '../../../../utils/interfaces/query';
import {ResponseDTO} from '../../../../utils/interfaces/http/api';
import {LoadingAnimationService} from '../../../../services/animation/loading-animation.service';
import {AddressDTO, CartItemDTO} from '../../../../utils/interfaces/dto/order';
import {AuthService} from '../../../../services/auth/auth.service';
import {AnonOrderFormData, UserOrderFormData} from '../../../../utils/interfaces/http/order';
import {TranslatePipe} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';
import {ErrorService} from '../../../../services/error/error.service';
import {isFormValid} from '../../../../utils/functions';
import {Textarea} from 'primeng/textarea';
import {UserDetailsComponent} from '../../../user/details/user-details.component';
import {injectMutation, injectQuery, QueryClient} from '@tanstack/angular-query-experimental';
import {firstValueFrom, lastValueFrom} from 'rxjs';
import {OrderHttpService} from '../../../../services/http/order/order-http.service';
import {ResourcesHttpService} from '../../../../services/http/resources/resources-http.service';
import {UserHttpService} from '../../../../services/http/user/user-http.service';

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
  private loadingAnimationService = inject(LoadingAnimationService);
  private resourcesHttpService = inject(ResourcesHttpService);
  protected checkoutFormService = inject(CheckoutFormService);
  private orderHttpService = inject(OrderHttpService);
  private userHttpService = inject(UserHttpService);
  private errorService = inject(ErrorService);
  protected authService = inject(AuthService);
  protected cartService = inject(CartService);
  private queryClient = inject(QueryClient);
  private router = inject(Router);

  private createAnonOrder: MutationResult = injectMutation(() => ({
    mutationFn: (request: MutationRequest) => lastValueFrom(this.orderHttpService.createAnonOrder(request.payload))
  }));

  private createUserOrder: MutationResult = injectMutation(() => ({
    mutationFn: (request: MutationRequest) => lastValueFrom(this.orderHttpService.createUserOrder(request.payload)),
    onSuccess: () => {
      this.queryClient.refetchQueries({queryKey: USER_ORDER_SUMMARY_LIST});
    }
  }));

  private stores: QueryResult = injectQuery(() => ({
    queryKey: [RESOURCE_STORES],
    queryFn: () => firstValueFrom(this.resourcesHttpService.findStores()),
  }));

  private userAddressList: QueryResult = injectQuery(() => ({
    queryKey: USER_ADDRESS_LIST,
    queryFn: () => lastValueFrom(this.userHttpService.findUserAddressList())
  }));

  protected selectedStore: StoreDTO | null = null;
  protected selectedAddress: AddressDTO | null = null;

  ngOnInit(): void {
    this.checkoutFormService.step = 4;

    if (this.checkoutFormService.isStepFilled(4)) {

      if (this.checkoutFormService.comment !== null) {
        this.form.controls.comment.patchValue(this.checkoutFormService.comment);
      }

      if (this.checkoutFormService.where === null && this.checkoutFormService.selectedAddress.id !== null) {
        // either store or user address was selected since where is null

        if (this.checkoutFormService.selectedAddress.isStore) {
          // store address
          const fetchedStores = this.stores.data()!.payload as StoreDTO[]; // NOTE - data is in cache
          const selectedStoreIndex = fetchedStores.findIndex(store => store.address.id === this.checkoutFormService.selectedAddress.id);
          this.selectedStore = fetchedStores[selectedStoreIndex];

        } else {
          // user address
          if (this.authService.isAuthenticated()) {
            const fetchedUserAddressList = this.userAddressList.data()!.payload as AddressDTO[]; // NOTE - data in cache
            const selectedAddressIndex = fetchedUserAddressList.findIndex(address => address.id === this.checkoutFormService.selectedAddress.id);
            this.selectedAddress = fetchedUserAddressList[selectedAddressIndex];
          }
        }
      }
    }
  }

  protected form = new FormGroup({
    comment: new FormControl<string | null>(null, {
      validators: [Validators.maxLength(150), Validators.pattern(esCharsAndNumbersAndBasicSymbolsRgx)],
      nonNullable: false,
      updateOn: "change"
    }),
  });

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

  private newUserOrder() {
    const payload: UserOrderFormData = {
      addressId: this.checkoutFormService.selectedAddress.id!,
      orderDetails: {
        id: null,
        deliveryTime: this.checkoutFormService.when!.deliveryTime,
        paymentMethod: this.checkoutFormService.how!.paymentMethod,
        billToChange: this.checkoutFormService.how!.billToChange,
        comment: this.form.get("comment")!.value,
        storePickUp: this.checkoutFormService.selectedAddress.isStore === null ? false : this.checkoutFormService.selectedAddress.isStore
      },
      cart: {
        id: null,
        cartItems: cleanIds(this.cartService.items()),
        totalQuantity: this.cartService.quantity(),
        totalCost: Number(this.cartService.total.toFixed(2)),
        totalCostOffers: Number(this.cartService.totalAfterOffers.toFixed(2)),
      }
    };

    this.createUserOrder.mutate({payload: payload}, {
      onSuccess: (response: ResponseDTO) => {
        if (response.status.error && response.error) {
          this.errorService.handleError(response.error);

        } else {

          this.cartService.clear();
          this.checkoutFormService.clear();
          this.checkoutFormService.orderSuccess = response.payload;
          this.router.navigate(['order', 'success']);
        }
      },
      onError: () => {
        this.errorService.handleServerNoResponse();
      },
      onSettled: () => {
        this.loadingAnimationService.stopLoading();
      }
    });
  }

  private newAnonOrder() {
    const payload: AnonOrderFormData = {
      customer: {
        name: this.checkoutFormService.who!.name,
        contactNumber: this.checkoutFormService.who!.contactNumber,
        email: this.checkoutFormService.who!.email,
      },
      address: {
        id: this.checkoutFormService.selectedAddress.id === null ? null : this.checkoutFormService.selectedAddress.id,
        street: this.checkoutFormService.where === null ? null : this.checkoutFormService.where.street,
        number: this.checkoutFormService.where === null ? null : this.checkoutFormService.where.number,
        details: this.checkoutFormService.where === null ? null : this.checkoutFormService.where.details,
      },
      orderDetails: {
        id: null,
        deliveryTime: this.checkoutFormService.when!.deliveryTime,
        paymentMethod: this.checkoutFormService.how!.paymentMethod,
        billToChange: this.checkoutFormService.how!.billToChange,
        comment: this.form.get("comment")!.value,
        storePickUp: this.checkoutFormService.selectedAddress.isStore === null ? false : this.checkoutFormService.selectedAddress.isStore
      },
      cart: {
        id: null,
        cartItems: cleanIds(this.cartService.items()),
        totalQuantity: this.cartService.quantity(),
        totalCost: Number(this.cartService.total.toFixed(2)),
        totalCostOffers: Number(this.cartService.totalAfterOffers.toFixed(2)),
      }
    };

    this.createAnonOrder.mutate({payload: payload}, {
      onSuccess: (response: ResponseDTO) => {
        if (response.status.error && response.error) {
          this.errorService.handleError(response.error);

        } else {

          this.cartService.clear();
          this.checkoutFormService.clear();
          this.checkoutFormService.orderSuccess = response.payload;
          this.router.navigate(['order', 'success']);
        }
      },
      onError: () => {
        this.errorService.handleServerNoResponse();
      },
      onSettled: () => {
        this.loadingAnimationService.stopLoading();
      }
    });
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
}

function cleanIds(items: CartItemDTO[]) {
  const newItems: CartItemDTO[] = [];
  items.forEach((item) => {
    item.id = "1"; // set as a number in string so JSON can deserialize the value to Long
    newItems.push(item);
  });
  return newItems;
}
