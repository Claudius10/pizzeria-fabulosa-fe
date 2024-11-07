import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {CartComponent} from '../../../cart/cart.component';
import {PaginatorModule} from 'primeng/paginator';
import {CheckoutFormService} from '../../../../services/forms/checkout/checkout-form.service';
import {esCharsAndNumbersAndBasicSymbolsRgx, numbersRegex} from '../../../../regex';
import {AuthService} from '../../../../services/auth/auth.service';
import {CartService} from '../../../../services/cart/cart.service';
import {AddressListComponent} from '../../../user/address-list/address-list.component';
import {toSignal} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {UserService} from '../../../../services/user/user.service';
import {AddressDTO} from '../../../../interfaces/dto/order';

@Component({
  selector: 'app-user-checkout-form',
  standalone: true,
  imports: [
    CartComponent,
    PaginatorModule,
    ReactiveFormsModule,
    AddressListComponent
  ],
  templateUrl: './user-checkout-form.component.html',
  styleUrl: './user-checkout-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCheckoutFormComponent {
  protected checkoutFormService = inject(CheckoutFormService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);
  userName = this.authService.getUserName();
  userEmail = this.authService.getUserEmail();
  addressList = toSignal<AddressDTO[]>(this.getUserAddressList(this.authService.getUserId()));

  private getUserAddressList(userId: string | undefined) {
    if (userId === undefined) {
      // user not authed - notification
      return of([]);
    }
    return this.userService.getAddressList(userId);
  }

  form = new FormGroup({
    addressId: new FormControl(0, {
      nonNullable: true,
    }),
    orderDetails: new FormGroup({
      deliveryTime: new FormControl("Lo antes posible", {
        validators: [Validators.required],
        nonNullable: true,
        updateOn: "blur"
      }),
      paymentMethod: new FormControl("Tarjeta", {
        validators: [Validators.required],
        nonNullable: true,
        updateOn: "blur"
      }),
      changeRequestChoice: new FormControl({value: "F", disabled: true}, {
        nonNullable: true,
      }),
      billToChange: new FormControl<number | null>(null, {
        validators: [Validators.pattern(numbersRegex)],
        updateOn: "blur"
      }),
      comment: new FormControl<string | null>(null,
        [Validators.pattern(esCharsAndNumbersAndBasicSymbolsRgx), Validators.maxLength(250)])
    })
  }, {validators: [validateChangeToGive]});


  public onSubmit() {
    if (this.authService.getUserId() === undefined) {
      //notify
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const sub = this.checkoutFormService.createUserOrder({
        addressId: this.form.get("addressId")!.value,
        orderDetails: {
          id: null,
          deliveryTime: this.form.get("orderDetails.deliveryTime")!.value,
          paymentMethod: this.form.get("orderDetails.paymentMethod")!.value,
          changeRequestChoice: this.form.get("orderDetails.changeRequestChoice")!.value,
          billToChange: this.form.get("orderDetails.billToChange")!.value === null ? null : this.form.get("orderDetails.billToChange")!.value,
          comment: this.form.get("orderDetails.comment")!.value === null ? null : this.form.get("orderDetails.comment")!.value,
        },
        cart: {
          id: null,
          orderItems: this.cartService.cartItems(),
          totalCost: this.cartService.cartTotal(),
          totalCostOffers: this.cartService.cartTotalAfterOffers(),
          totalQuantity: this.cartService.cartQuantity(),
        }
      },
      this.authService.getUserId()!).subscribe({
      next: response => {

      },
      error: error => {

      }
    });

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}

const validateChangeToGive: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const changeRequested = control.get("changeRequestChoice");
  const billToChange = control.get("billToChange");
  return changeRequested && changeRequested.value === "V" && billToChange && billToChange.value <= 0 ? {valid: false} : null;
};
