import {ChangeDetectionStrategy, Component, inject, OnDestroy} from '@angular/core';
import {CheckoutFormService} from '../../../../services/checkout/checkout-form.service';
import {Router} from '@angular/router';
import {RESOURCE_STORES, USER_ADDRESS_LIST} from '../../../../utils/query-keys';
import {ResourceService} from '../../../../services/http/resources/resource.service';
import {StoreDTO} from '../../../../interfaces/dto/resources';
import {StoreCheckoutComponent} from '../store/store-checkout.component';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {esCharsAndNumbersAndBasicSymbolsRgx} from '../../../../utils/regex';
import {CartService} from '../../../../services/cart/cart.service';
import {OrderService} from '../../../../services/http/order/order.service';
import {MutationResult} from '../../../../interfaces/mutation';
import {QueryResult} from '../../../../interfaces/query';
import {ResponseDTO} from '../../../../interfaces/http/api';
import {LoadingAnimationService} from '../../../../services/animation/loading-animation.service';
import {AddressDTO, CartItemDTO} from '../../../../interfaces/dto/order';
import {UserService} from '../../../../services/http/user/user.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {AnonOrderFormData, NewUserOrderFormData} from '../../../../interfaces/http/order';
import {TranslatePipe} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';
import {ErrorService} from '../../../../services/error/error.service';
import {isFormValid} from '../../../../utils/functions';
import {Textarea} from 'primeng/textarea';
import {UserDetailsComponent} from '../../../user/details/user-details.component';

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
export class StepFiveSummaryComponent implements OnDestroy {
  protected checkoutFormService = inject(CheckoutFormService);
  private loadingAnimationService = inject(LoadingAnimationService);
  private resourceService = inject(ResourceService);
  private userService = inject(UserService);
  protected authService = inject(AuthService);
  private orderService = inject(OrderService);
  protected cartService = inject(CartService);
  private router = inject(Router);
  private errorService = inject(ErrorService);
  private createAnonOrder: MutationResult = this.orderService.createAnonOrder();
  private createUserOrder: MutationResult = this.orderService.createUserOrder();
  stores: QueryResult = this.resourceService.findStores({queryKey: RESOURCE_STORES});
  selectedStore: StoreDTO | null = null;
  selectedAddress: AddressDTO | null = null;

  constructor() {
    this.checkoutFormService.step = 4;

    if (this.checkoutFormService.isStepFilled(4) && this.checkoutFormService.where !== null && this.checkoutFormService.where.id !== null) {

      // selected store, either by user or anon
      if (this.checkoutFormService.selectedId.isStore) {
        const fetchedStores = this.stores.data()!.payload as StoreDTO[]; // NOTE - guaranteed to be in cache
        const selectedStoreIndex = fetchedStores.findIndex(store => store.id === this.checkoutFormService.where!.id);
        this.selectedStore = fetchedStores[selectedStoreIndex];
      } else {
        // if user is authed
        if (this.authService.isAuthenticated) {
          const userAddressList: QueryResult = this.userService.findUserAddressList({
            queryKey: USER_ADDRESS_LIST,
            id: this.authService.userId
          }); // NOTE - guaranteed to be in cache

          const fetchedUserAddressList = userAddressList.data()!.payload as AddressDTO[];
          const selectedAddressIndex = fetchedUserAddressList.findIndex(address => address.id === this.checkoutFormService.where!.id);
          this.selectedAddress = fetchedUserAddressList[selectedAddressIndex];
        }
      }
    }
  }

  form = new FormGroup({
    comment: new FormControl<string | null>(null, {
      validators: [Validators.maxLength(150), Validators.pattern(esCharsAndNumbersAndBasicSymbolsRgx)],
      nonNullable: false,
      updateOn: "change"
    }),
  });

  previousStep() {
    this.router.navigate(['order', 'new', 'step-four']);
  }

  cancel() {
    this.checkoutFormService.clear();
    this.router.navigate(['/']);
  }

  firstStep() {
    this.router.navigate(['order', 'new', 'step-one']);
  }

  onSubmit(): void {
    if (isFormValid(this.form)) {
      this.createOrder();
    }
  }

  ngOnDestroy(): void {
    this.loadingAnimationService.stopLoading();
  }

  private createOrder() {
    this.loadingAnimationService.startLoading();

    if (this.authService.isAuthenticated) {

      const payload: NewUserOrderFormData = {
        userId: this.authService.userId,
        order: {
          addressId: this.checkoutFormService.selectedId.id!,
          orderDetails: {
            id: null,
            deliveryTime: this.checkoutFormService.when!.deliveryTime,
            paymentMethod: this.checkoutFormService.how!.paymentMethod,
            billToChange: this.checkoutFormService.how!.billToChange,
            comment: this.form.get("comment")!.value,
          },
          cart: {
            id: null,
            cartItems: cleanIds(this.cartService.items()),
            totalQuantity: this.cartService.quantity(),
            totalCost: Number(this.cartService.total.toFixed(2)),
            totalCostOffers: Number(this.cartService.totalAfterOffers.toFixed(2)),
          }
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
    } else {
      const payload: AnonOrderFormData = {
        customer: {
          name: this.checkoutFormService.who!.name,
          contactNumber: this.checkoutFormService.who!.contactNumber,
          email: this.checkoutFormService.who!.email,
        },
        address: {
          id: this.checkoutFormService.where!.id,
          street: this.checkoutFormService.where!.street,
          number: this.checkoutFormService.where!.number,
          details: this.checkoutFormService.where!.details
        },
        orderDetails: {
          id: null,
          deliveryTime: this.checkoutFormService.when!.deliveryTime,
          paymentMethod: this.checkoutFormService.how!.paymentMethod,
          billToChange: this.checkoutFormService.how!.billToChange,
          comment: this.form.get("comment")!.value,
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
  }
}

function cleanIds(items: CartItemDTO[]) {
  const newItems: CartItemDTO[] = [];
  items.forEach((item) => {
    item.id = "1"; // will be set to NULL when serializing to POJO
    newItems.push(item);
  });
  return newItems;
}
