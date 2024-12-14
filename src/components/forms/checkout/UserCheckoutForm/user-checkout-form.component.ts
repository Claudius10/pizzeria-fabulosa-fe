import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {CheckoutFormService} from '../../../../services/forms/checkout/checkout-form.service';
import {esCharsAndNumbersAndBasicSymbolsRgx, numbersRegex} from '../../../../regex';
import {AuthService} from '../../../../services/auth/auth.service';
import {CartService} from '../../../../services/cart/cart.service';
import {OrderService} from '../../../../services/http/order/order.service';
import {NewUserOrderFormData, UpdateUserOrderFormData} from '../../../../interfaces/http/order';
import {USER_ADDRESS_LIST} from '../../../../utils/query-keys';
import {UserService} from '../../../../services/http/user/user.service';
import {MenuItem} from 'primeng/api';
import {ResponseDTO} from '../../../../interfaces/http/api';

@Component({
  selector: 'app-user-checkout-form',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-checkout-form.component.html',
  styleUrl: './user-checkout-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCheckoutFormComponent {
  protected checkoutFormService = inject(CheckoutFormService);
  private orderService = inject(OrderService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  userName = this.authService.getUserName();
  userEmail = this.authService.getUserEmail();
  addressList = this.userService.findUserAddressList({
    queryKey: USER_ADDRESS_LIST,
    userId: this.authService.getUserId()
  });
  orderToUpdateId = this.orderService.getId();
  createUserOrder = this.orderService.createUserOrder();
  updateUserOrder = this.orderService.updateUserOrder();

  items: MenuItem[] = [
    {label: "Mi cesta"},
    {label: "Opciones de entrega"},
    {label: "Método de pago"},
    {label: "Resumen"},
  ];

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
      // ONLY USING 'changeRequestChoice' SO I CAN ENABLE/DISABLE THE SELECT, NOT ACTUALLY SENDING THE VALUE TO THE BACK-END
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
    const userId = this.authService.getUserId();
    if (userId === undefined) {
      //notify
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: NewUserOrderFormData = {
      userId: Number(userId),
      order: {
        addressId: Number(this.form.get("addressId")!.value),
        orderDetails: {
          id: null,
          deliveryTime: this.form.get("orderDetails.deliveryTime")!.value,
          paymentMethod: this.form.get("orderDetails.paymentMethod")!.value,
          billToChange: this.form.get("orderDetails.billToChange")!.value === null ? null : this.form.get("orderDetails.billToChange")!.value,
          comment: this.form.get("orderDetails.comment")!.value === null ? null : this.form.get("orderDetails.comment")!.value,
        },
        cart: {
          id: null,
          cartItems: this.cartService.cartItems(),
          totalCost: this.cartService.cartTotal(),
          totalCostOffers: this.cartService.cartTotalAfterOffers(),
          totalQuantity: this.cartService.cartQuantity(),
        }
      }
    };

    if (this.orderToUpdateId() === null) {
      // create new order
      this.createUserOrder.mutate(data, {
        onSuccess: (response: ResponseDTO) => {
          console.log(response);
          console.log("success");
          this.cartService.clear();
        },
        onError: (error, variables, context) => {
          console.log(error);
        }
      });
    } else {
      // update existing order
      const order = this.orderService.getOrder(this.orderToUpdateId());

      const updateData: UpdateUserOrderFormData = {
        userId: Number(userId),
        orderId: order.id,
        order: {
          createdOn: order.createdOn,
          addressId: data.order.addressId,
          orderDetails: {
            ...data.order.orderDetails,
            id: order.orderDetails.id
          },
          cart: {
            ...data.order.cart,
            id: order.cart.id
          }
        }
      };

      this.updateUserOrder.mutate(updateData, {
        onSuccess: (response: ResponseDTO) => {
          console.log(response);
          console.log("success");
          this.cartService.clear();
          this.orderService.setId(null);
        },
        onError: (error, variables, context) => {
          console.log(error);
        }
      });
    }
  }
}

const validateChangeToGive: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const changeRequested = control.get("changeRequestChoice");
  const billToChange = control.get("billToChange");
  return changeRequested && changeRequested.value === "V" && billToChange && billToChange.value <= 0 ? {valid: false} : null;
};
