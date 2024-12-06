import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {CheckoutFormService} from '../../../../services/forms/checkout/checkout-form.service';
import {
  emailRgx,
  esCharsAndNumbersAndBasicSymbolsRgx,
  esCharsAndNumbersRegex,
  esCharsRegex,
  numbersRegex
} from '../../../../regex';
import {CartService} from '../../../../services/cart/cart.service';
import {OrderService} from '../../../../services/http/order/order.service';
import {AnonOrderDTO} from '../../../../interfaces/dto/order';
import {MenuItem} from 'primeng/api';
import {StepsModule} from 'primeng/steps';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {SmallScreenStepsComponent} from '../../../layout/steps/small-screen-steps.component';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {CheckoutCartComponent} from '../../../cart/checkout/checkout-cart.component';
import {StepOneWhoComponent} from '../steps/1-step-one-who/step-one-who.component';
import {StepTwoWhereComponent} from '../steps/2-step-two-where/step-two-where.component';
import {StepThreeWhenComponent} from '../steps/3-step-three-when/step-three-when.component';
import {StepFourHowComponent} from '../steps/4-step-four-how/step-four-how.component';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-anon-user-checkout-form',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [
    ReactiveFormsModule,
    StepsModule,
    CardModule,
    PanelModule,
    SmallScreenStepsComponent,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    CheckoutCartComponent,
    StepOneWhoComponent,
    StepTwoWhereComponent,
    StepThreeWhenComponent,
    StepFourHowComponent,
    Button
  ],
  templateUrl: './anon-user-checkout-form.component.html',
  styleUrl: './anon-user-checkout-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnonUserCheckoutFormComponent {
  private router = inject(Router);
  protected checkoutFormService = inject(CheckoutFormService);
  private orderService = inject(OrderService);
  private cartService = inject(CartService);
  private createAnonOrder = this.orderService.createAnonOrder();
  steps: MenuItem[] = [
    {label: "Mis datos",},
    {label: "Dirección de entrega"},
    {label: "Plazo de entrega"},
    {label: "Método de pago"}, {label: "Resumen"},
  ];

  cancel() {
    this.checkoutFormService.cancel();
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    //   console.log(this.form.value);
    //   if (this.form.invalid) {
    //     this.createAnonOrder.mutate({
    //       anonCustomerName: this.form.get("who.fullName")!.value,
    //       anonCustomerContactNumber: Number(this.form.get("who.contactNumber")!.value),
    //       anonCustomerEmail: this.form.get("who.email")!.value,
    //       address: {
    //         id: this.form.get("where.storeId")!.value === null ? null : this.form.get("where.storeId")!.value,
    //         street: this.form.get("where.street")!.value,
    //         streetNr: Number(this.form.get("where.number")!.value),
    //         gate: null,
    //         staircase: null,
    //         floor: null,
    //         door: this.form.get("where.door")!.value === null ? null : this.form.get("where.door")!.value,
    //       },
    //       orderDetails: {
    //         id: null,
    //         deliveryTime: this.form.get("when.deliveryTime")!.value,
    //         paymentMethod: this.form.get("how.paymentMethod")!.value,
    //         billToChange: this.form.get("how.billToChange")!.value === null ? null : this.form.get("how.billToChange")!.value,
    //         comment: this.form.get("how.comment")!.value === null ? null : this.form.get("how.comment")!.value,
    //       },
    //       cart: {
    //         id: null,
    //         cartItems: this.cartService.cartItems(),
    //         totalCost: this.cartService.cartTotal(),
    //         totalCostOffers: this.cartService.cartTotalAfterOffers(),
    //         totalQuantity: this.cartService.cartQuantity(),
    //       }
    //     }, {
    //       onSuccess: (response: AnonOrderDTO) => {
    //         console.log(response);
    //         console.log("success");
    //         this.cartService.clear();
    //       },
    //       onError: (error, variables, context) => {
    //         console.log(error);
    //       }
    //     });
    //   }
    // }
  }
}
