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
import {MutationResult} from '../../../../../interfaces/mutation';
import {isFormValid} from '../../../../../utils/functions';
import {QueryResult} from '../../../../../interfaces/query';
import {ResponseDTO} from '../../../../../interfaces/http/api';
import {LoadingAnimationService} from '../../../../../services/navigation/loading-animation.service';
import {AddressDTO} from '../../../../../interfaces/dto/order';
import {UserService} from '../../../../../services/http/user/user.service';
import {AuthService} from '../../../../../services/auth/auth.service';
import {AnonOrderFormData, NewUserOrderFormData} from '../../../../../interfaces/http/order';

@Component({
  selector: 'app-step-five-summary',
  standalone: true,
  imports: [
    StoreCheckoutComponent,
    CardModule,
    InputTextareaModule,
    Button,
    ReactiveFormsModule
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
  private createAnonOrder: MutationResult = this.orderService.createAnonOrder();
  private createUserOrder: MutationResult = this.orderService.createUserOrder();
  isAuthenticated: Signal<boolean> = this.authService.getIsAuthenticated();
  userName = this.authService.getUserName();
  userEmail = this.authService.getUserEmail();
  selectedStore: StoreDTO | null;
  selectedAddress: AddressDTO | null;

  ngOnDestroy(): void {
    this.loadingAnimationService.stopLoading();
  }

  constructor() {
    this.checkoutFormService.step.set(4);

    if (this.checkoutFormService.isStepFilled(4) && this.checkoutFormService.where()!.id !== null) {

      if (this.checkoutFormService.selectedId().isStore) {

        const stores: QueryResult = this.resourceService.findStores({queryKey: RESOURCE_STORES});
        const payload = stores.data()!.payload as StoreDTO[];
        const selectedStoreIndex = payload.findIndex(store => store.id === this.checkoutFormService.where()!.id);
        this.selectedStore = payload[selectedStoreIndex];
        this.selectedAddress = null;
      } else {

        const addressList = this.userService.findUserAddressList({
          queryKey: USER_ADDRESS_LIST,
          userId: this.authService.getUserId()
        });
        const payload = addressList.data()!.payload as AddressDTO[];
        const selectedAddressIndex = payload.findIndex(address => address.id === this.checkoutFormService.where()!.id);
        this.selectedAddress = payload[selectedAddressIndex];
        this.selectedStore = null;
      }

    } else {
      this.selectedAddress = null;
      this.selectedStore = null;
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

  goBack(start: boolean) {
    this.checkoutFormService.clear();
    if (start) {
      this.router.navigate(['order', 'new', 'step-one']);
    } else {
      this.router.navigate(['/']);
    }
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
            cartItems: this.cartService.cartItems(),
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
          this.cartService.set(response.payload.cart.cartItems, response.payload.cart.totalQuantity, response.payload.cart.totalCost);
          this.checkoutFormService.orderSuccess.set(response.payload);
          this.router.navigate(['order', 'success']);
        },
        onError: (error) => {
          console.log(error);
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
          cartItems: this.cartService.cartItems(),
          totalQuantity: this.cartService.cartQuantity(),
          totalCost: Number(this.cartService.cartTotal().toFixed(2)),
          totalCostOffers: Number(this.cartService.cartTotalAfterOffers().toFixed(2)),
        }
      };

      this.createAnonOrder.mutate({payload: payload}, {
        onSuccess: (response: ResponseDTO) => {
          this.cartService.clear();
          this.checkoutFormService.clear();
          this.cartService.set(response.payload.cart.cartItems, response.payload.cart.totalQuantity, response.payload.cart.totalCost);
          this.checkoutFormService.orderSuccess.set(response.payload);
          this.router.navigate(['order', 'success']);
        },
        onError: (error, variables, context) => {
          console.log(error);
        },
        onSettled: () => {
          this.loadingAnimationService.stopLoading();
        }
      });
    }
  }
}
