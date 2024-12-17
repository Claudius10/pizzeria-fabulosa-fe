import {Routes} from '@angular/router';
import {PizzaListComponent} from '../front/products/pizzas/pizza-list.component';
import {HomeComponent} from '../front/home/home.component';
import {RegisterComponent} from '../forms/register/register.component';
import {NotFoundComponent} from './wildcard-routes/not-found/not-found.component';
import {ForbiddenComponent} from './wildcard-routes/forbidden/forbidden.component';
import {UserHomeComponent} from '../user/home/user-home.component';
import {userCredentialsGuardGuard} from '../user/guard/user-credentials-guard.guard';
import {ProfileComponent} from '../user/profile/profile.component';
import {OrderSummaryListComponent} from '../order/summary/list/order-summary-list.component';
import {SettingsComponent} from '../user/settings/settings.component';
import {OrderComponent} from '../order/update/order.component';
import {BeverageListComponent} from '../front/products/beverages/beverage-list.component';
import {CheckoutFormComponent} from '../forms/checkout/CheckoutForm/checkout-form.component';
import {StepOneWhoComponent} from '../forms/checkout/steps/1-step-one-who/step-one-who.component';
import {StepTwoWhereComponent} from '../forms/checkout/steps/2-step-two-where/step-two-where.component';
import {StepThreeWhenComponent} from '../forms/checkout/steps/3-step-three-when/step-three-when.component';
import {StepFourHowComponent} from '../forms/checkout/steps/4-step-four-how/step-four-how.component';
import {StepFiveSummaryComponent} from '../forms/checkout/steps/5-step-five-summary/step-five-summary.component';
import {NewOrderSuccessComponent} from '../forms/checkout/success/new-order-success.component';
import {NewOrderErrorComponent} from '../forms/checkout/error/new-order-error.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "pizzas",
    component: PizzaListComponent,
    title: "Pizzas",
  },
  {
    path: "beverages",
    component: BeverageListComponent,
    title: "Beverages",
  },
  {
    path: "user",
    component: UserHomeComponent,
    canMatch: [userCredentialsGuardGuard],
    children: [
      {
        path: "profile",
        component: ProfileComponent,
        title: "Your Profile",
      },
      {
        path: "orders",
        component: OrderSummaryListComponent,
        title: "Your Orders",
      },
      {
        path: "orders/:orderId",
        component: OrderComponent,
        title: "Your Order",
        pathMatch: "full",
      },
      {
        path: "settings",
        component: SettingsComponent,
        title: "Account Settings",
      }
    ]
  },
  {
    path: "order",
    children: [
      {
        path: "new",
        component: CheckoutFormComponent,
        title: "New Order",
        children: [
          {
            path: "step-one",
            component: StepOneWhoComponent,
            title: "Customer details",
          },
          {
            path: "step-two",
            component: StepTwoWhereComponent,
            title: "Delivery location details",
          },
          {
            path: "step-three",
            component: StepThreeWhenComponent,
            title: "Delivery time details",
          },
          {
            path: "step-four",
            component: StepFourHowComponent,
            title: "Payment details",
          },
          {
            path: "step-five",
            component: StepFiveSummaryComponent,
            title: "New Order Summary",
          }
        ]
      },
      {
        path: "success",
        component: NewOrderSuccessComponent,
        title: "New Order Success",
      },
      {
        path: "error",
        component: NewOrderErrorComponent,
        title: "New Order Error",
      }
    ]
  },
  {
    path: "registration",
    component: RegisterComponent,
    title: "Create your account"
  },
  {
    path: "forbidden",
    component: ForbiddenComponent,
    title: "403 Access forbidden",
  },
  {
    path: "**",
    component: NotFoundComponent,
    title: "404 Not Found",
  }
];
