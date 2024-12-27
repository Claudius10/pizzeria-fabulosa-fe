import {ChangeDetectionStrategy, Component, inject, OnDestroy, signal, Signal} from '@angular/core';
import {CheckoutFormService} from '../../../../../services/checkout/checkout-form.service';
import {Router} from '@angular/router';
import {RESOURCE_STORES, USER_ADDRESS_LIST} from '../../../../../utils/query-keys';
import {ResourceService} from '../../../../../services/http/resources/resource.service';
import {StoreDTO} from '../../../../../interfaces/dto/resources';
import {StoreCheckoutComponent} from '../store/store-checkout.component';
import {CardModule} from 'primeng/card';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {Button} from 'primeng/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {esCharsAndNumbersAndBasicSymbolsRgx} from '../../../../../regex';
import {CartService} from '../../../../../services/cart/cart.service';
import {OrderService} from '../../../../../services/http/order/order.service';
import {MutationResult} from '../../../../../interfaces/mutation';
import {QueryResult} from '../../../../../interfaces/query';
import {ResponseDTO} from '../../../../../interfaces/http/api';
import {LoadingAnimationService} from '../../../../../services/navigation/loading-animation.service';
import {AddressDTO, CartItemDTO} from '../../../../../interfaces/dto/order';
import {UserService} from '../../../../../services/http/user/user.service';
import {AuthService} from '../../../../../services/auth/auth.service';
import {AnonOrderFormData, NewUserOrderFormData} from '../../../../../interfaces/http/order';
import {TranslatePipe} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';
import {ErrorService} from '../../../../../services/error/error.service';
import {isFormValid} from '../../../../../utils/functions';

@Component({
  selector: 'app-step-five-summary',
  standalone: true,
  imports: [
    StoreCheckoutComponent,
    CardModule,
    InputTextareaModule,
    Button,
    ReactiveFormsModule,
    TranslatePipe,
    UpperCasePipe
  ],
  templateUrl: './step-five-summary.component.html',
  styleUrl: './step-five-summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepFiveSummaryComponent implements OnDestroy {
  protected checkoutFormService = inject(CheckoutFormService);
  private loadingAnimationService = inject(LoadingAnimationService);
  private resourceService = inject(ResourceService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private orderService = inject(OrderService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private errorService = inject(ErrorService);
  private createAnonOrder: MutationResult = this.orderService.createAnonOrder();
  private createUserOrder: MutationResult = this.orderService.createUserOrder();
  stores: QueryResult = this.resourceService.findStores({queryKey: RESOURCE_STORES});
  selectedStore = signal<StoreDTO | null>(null);
  selectedAddress = signal<AddressDTO | null>(null);
  isAuthenticated: Signal<boolean> = this.authService.getIsAuthenticated();
  userName = this.authService.getUserName();
  userEmail = this.authService.getUserEmail();

  ngOnDestroy(): void {
    this.loadingAnimationService.stopLoading();
  }

  constructor() {
    this.checkoutFormService.step.set(4);

    if (this.checkoutFormService.isStepFilled(4) && this.checkoutFormService.where()!.id !== null) {

      // selected store, either by user or anon
      if (this.checkoutFormService.selectedId().isStore) {
        const fetchedStores = this.stores.data()!.payload as StoreDTO[]; // NOTE - guaranteed to be here
        const selectedStoreIndex = fetchedStores.findIndex(store => store.id === this.checkoutFormService.where()!.id);
        this.selectedStore.set(fetchedStores[selectedStoreIndex]);
      } else {
        // if user is authed
        if (this.isAuthenticated()) {
          const userAddressList: QueryResult = this.userService.findUserAddressList({
            queryKey: USER_ADDRESS_LIST,
            id: this.authService.getUserId()
          }); // NOTE - guaranteed to be here because it will load in step two when user is logged in

          const fetchedUserAddressList = userAddressList.data()!.payload as AddressDTO[];
          const selectedAddressIndex = fetchedUserAddressList.findIndex(address => address.id === this.checkoutFormService.where()!.id);
          this.selectedAddress.set(fetchedUserAddressList[selectedAddressIndex]);
        }
      }
    }
  }

  form = new FormGroup({
    comment: new FormControl<string | null>(null, {
      validators: [Validators.maxLength(150), Validators.pattern(esCharsAndNumbersAndBasicSymbolsRgx)],
      nonNullable: false,
      updateOn: "blur"
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

  createOrder() {
    // authenticated user order
    if (this.isAuthenticated()) {
      this.loadingAnimationService.startLoading();

      const payload: NewUserOrderFormData = {
        userId: this.authService.getUserId(),
        order: {
          addressId: this.checkoutFormService.selectedId().id!,
          orderDetails: {
            id: null,
            deliveryTime: this.checkoutFormService.when()!.deliveryTime,
            paymentMethod: this.checkoutFormService.how()!.paymentMethod,
            billToChange: this.checkoutFormService.how()!.billToChange,
            comment: this.form.get("comment")!.value,
          },
          cart: {
            id: null,
            cartItems: cleanIds(this.cartService.cartItems()),
            totalQuantity: this.cartService.cartQuantity(),
            totalCost: Number(this.cartService.cartTotal().toFixed(2)),
            totalCostOffers: Number(this.cartService.cartTotalAfterOffers().toFixed(2)),
          }
        }
      };

      this.createUserOrder.mutate({payload: payload}, {
        onSuccess: (response: ResponseDTO) => {
          if (response.status.error) {
            this.errorService.handleError(response);
          } else {
            this.cartService.clear();
            this.checkoutFormService.clear();
            this.checkoutFormService.orderSuccess.set(response.payload);
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
      // anon user order
      this.loadingAnimationService.startLoading();

      const payload: AnonOrderFormData = {
        customer: {
          name: this.checkoutFormService.who()!.name,
          contactNumber: this.checkoutFormService.who()!.contactNumber,
          email: this.checkoutFormService.who()!.email,
        },
        address: {
          id: this.checkoutFormService.where()!.id,
          street: this.checkoutFormService.where()!.street,
          number: this.checkoutFormService.where()!.number,
          details: this.checkoutFormService.where()!.details
        },
        orderDetails: {
          id: null,
          deliveryTime: this.checkoutFormService.when()!.deliveryTime,
          paymentMethod: this.checkoutFormService.how()!.paymentMethod,
          billToChange: this.checkoutFormService.how()!.billToChange,
          comment: this.form.get("comment")!.value,
        },
        cart: {
          id: null,
          cartItems: cleanIds(this.cartService.cartItems()),
          totalQuantity: this.cartService.cartQuantity(),
          totalCost: Number(this.cartService.cartTotal().toFixed(2)),
          totalCostOffers: Number(this.cartService.cartTotalAfterOffers().toFixed(2)),
        }
      };

      this.createAnonOrder.mutate({payload: payload}, {
        onSuccess: (response: ResponseDTO) => {
          if (response.status.error) {
            this.errorService.handleError(response);
          } else {
            this.cartService.clear();
            this.checkoutFormService.clear();
            this.checkoutFormService.orderSuccess.set(response.payload);
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
