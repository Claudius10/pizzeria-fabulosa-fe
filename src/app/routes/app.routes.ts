import {Routes} from '@angular/router';
import {PizzaListComponent} from '../../components/products/pizzas/pizza-list.component';
import {HomeComponent} from '../../components/home/home.component';
import {RegisterComponent} from '../../components/register/register.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {UserHomeComponent} from '../../components/user/home/user-home.component';
import {userCredentialsGuardGuard} from '../../components/user/guard/user-credentials-guard.guard';
import {ProfileComponent} from '../../components/user/profile/profile.component';
import {UserSettingsComponent} from '../../components/user/settings/user-settings.component';
import {BeverageListComponent} from '../../components/products/beverages/beverage-list.component';
import {StepOneWhoComponent} from '../../components/checkout/steps/1-step-one-who/step-one-who.component';
import {StepTwoWhereComponent} from '../../components/checkout/steps/2-step-two-where/step-two-where.component';
import {StepThreeWhenComponent} from '../../components/checkout/steps/3-step-three-when/step-three-when.component';
import {StepFourHowComponent} from '../../components/checkout/steps/4-step-four-how/step-four-how.component';
import {
  StepFiveSummaryComponent
} from '../../components/checkout/steps/5-step-five-summary/step-five-summary.component';
import {NewOrderSuccessComponent} from '../../components/checkout/success/new-order-success.component';
import {ErrorComponent} from './error/error.component';
import {OrderSummaryListComponent} from '../../components/user/orders/summary-list/list/order-summary-list.component';
import {OrderComponent} from '../../components/user/orders/order-item/order.component';
import {CheckoutFormComponent} from '../../components/checkout/form/checkout-form.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: "Pizzeria Fabulosa"
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
        title: "Profile",
      },
      {
        path: "orders",
        component: OrderSummaryListComponent,
        title: "Order History",
      },
      {
        path: "orders/:orderId",
        component: OrderComponent,
        title: "Order Review",
        pathMatch: "full",
      },
      {
        path: "settings",
        component: UserSettingsComponent,
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
            title: "New order: step one",
          },
          {
            path: "step-two",
            component: StepTwoWhereComponent,
            title: "New order: step two",
          },
          {
            path: "step-three",
            component: StepThreeWhenComponent,
            title: "New order: step three",
          },
          {
            path: "step-four",
            component: StepFourHowComponent,
            title: "New order: step four",
          },
          {
            path: "step-five",
            component: StepFiveSummaryComponent,
            title: "New order: step five",
          }
        ]
      },
      {
        path: "success",
        component: NewOrderSuccessComponent,
        title: "New order: Success",
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
    title: "Access forbidden",
  },
  {
    path: "error",
    component: ErrorComponent,
    title: "Unexpected Error",
  },
  {
    path: "**",
    component: NotFoundComponent,
    title: "Not Found",
  }
];
