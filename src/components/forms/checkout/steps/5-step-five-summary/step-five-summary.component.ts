import {ChangeDetectionStrategy, Component, inject, OnDestroy, Signal} from '@angular/core';
import {CheckoutFormService} from '../../../../../services/forms/checkout/checkout-form.service';
import {Router} from '@angular/router';
import {RESOURCE_STORES, USER_ADDRESS_LIST} from '../../../../../utils/query-keys';
import {ResourceService} from '../../../../../services/http/resources/resource.service';
import {StoreDTO} from '../../../../../interfaces/dto/resources';
import {StoreCheckoutComponent} from '../2-step-two-where/store/store-checkout.component';
import {CardModule} from 'primeng/card';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {Button} from 'primeng/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {esCharsAndNumbersAndBasicSymbolsRgx} from '../../../../../regex';
import {CartService} from '../../../../../services/cart/cart.service';
import {OrderService} from '../../../../../services/http/order/order.service';
import {ApiError, MutationResult} from '../../../../../interfaces/mutation';
import {handleError, handleFatalError, handleServerNoResponse, isFormValid} from '../../../../../utils/functions';
import {QueryResult} from '../../../../../interfaces/query';
import {ResponseDTO} from '../../../../../interfaces/http/api';
import {LoadingAnimationService} from '../../../../../services/navigation/loading-animation.service';
import {AddressDTO, CartItemDTO} from '../../../../../interfaces/dto/order';
import {UserService} from '../../../../../services/http/user/user.service';
import {AuthService} from '../../../../../services/auth/auth.service';
import {AnonOrderFormData, NewUserOrderFormData} from '../../../../../interfaces/http/order';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';
import {ErrorService} from '../../../../../services/error/error.service';
import {MessageService} from 'primeng/api';

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
  providers: [MessageService],
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
  private translateService = inject(TranslateService);
  private messageService = inject(MessageService);
  private createAnonOrder: MutationResult = this.orderService.createAnonOrder();
  private createUserOrder: MutationResult = this.orderService.createUserOrder();
  isAuthenticated: Signal<boolean> = this.authService.getIsAuthenticated();
  userName = this.authService.getUserName();
  userEmail = this.authService.getUserEmail();
  selectedStore: StoreDTO | null = null;
  selectedAddress: AddressDTO | null = null;

  ngOnDestroy(): void {
    this.loadingAnimationService.stopLoading();
  }

  constructor() {
    this.checkoutFormService.step.set(4);

    if (this.checkoutFormService.isStepFilled(4) && this.checkoutFormService.where()!.id !== null) {

      // selected store, either by user or anon
      if (this.checkoutFormService.selectedId().isStore) {
        const stores: QueryResult = this.resourceService.findStores({queryKey: RESOURCE_STORES});
        const payload = stores.data()!.payload as StoreDTO[]; // will be present since it's fetched when customer selects store-pickup
        const selectedStoreIndex = payload.findIndex(store => store.id === this.checkoutFormService.where()!.id);
        this.selectedStore = payload[selectedStoreIndex];

      } else {
        // if user is authed
        if (this.isAuthenticated()) {
          const addressList = this.userService.findUserAddressList({
            queryKey: USER_ADDRESS_LIST,
            userId: this.authService.getUserId()
          });

          const payload = addressList.data()!.payload as AddressDTO[];
          const selectedAddressIndex = payload.findIndex(address => address.id === this.checkoutFormService.where()!.id);
          this.selectedAddress = payload[selectedAddressIndex];
        }
      }
    }
  }

  form = new FormGroup({
    comment: new FormControl<string | null>(null, {
      validators: [Validators.pattern(esCharsAndNumbersAndBasicSymbolsRgx)],
      nonNullable: false,
      updateOn: "blur"
    }),
  });

  previousStep() {
    this.router.navigate(['order', 'new', 'step-four']);
  }

  cancel() {
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
    this.loadingAnimationService.startLoading();

    if (this.isAuthenticated()) {

      const payload: NewUserOrderFormData = {
        userId: Number(this.authService.getUserId()!),
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
          this.cartService.clear();
          this.checkoutFormService.clear();
          this.checkoutFormService.orderSuccess.set(response.payload);
          this.router.navigate(['order', 'success']);
        },
        onError: (error) => {
          const apiError = error as ApiError;
          const response: ResponseDTO = apiError.error;

          // server response?
          if (response.status !== undefined) {
            // error?
            if (response.status.error) {
              // fatal error?
              if (response.error!.fatal) {
                handleFatalError(response, this.errorService, this.router);
              } else
                handleError(response, this.messageService, this.translateService);
            }
          } else {
            handleServerNoResponse(this.messageService, this.translateService);
          }
        },
        onSettled: () => {
          this.loadingAnimationService.stopLoading();
        }
      });
    } else {

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
          this.cartService.clear();
          this.checkoutFormService.clear();
          this.checkoutFormService.orderSuccess.set(response.payload);
          this.router.navigate(['order', 'success']);
        },
        onError: (error) => {
          const apiError = error as ApiError;
          const response: ResponseDTO = apiError.error;

          // server response?
          if (response.status !== undefined) {
            // error?
            if (response.status.error) {
              // fatal error?
              if (response.error!.fatal) {
                handleFatalError(response, this.errorService, this.router);
              } else
                handleError(response, this.messageService, this.translateService);
            }
          } else {
            handleServerNoResponse(this.messageService, this.translateService);
          }
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
