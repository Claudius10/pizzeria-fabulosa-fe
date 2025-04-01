import {Routes} from '@angular/router';
import {PizzaListComponent} from '../../components/user/menu/pizzas/pizza-list.component';
import {HomeComponent} from '../../components/user/home/home.component';
import {userCredentialsGuardGuard} from '../../components/user/guard/user-credentials-guard.guard';
import {BeverageListComponent} from '../../components/user/menu/beverages/beverage-list.component';
import {RegisterComponent} from '../../components/user/register/register.component';
import {UserHomeComponent} from '../../components/user/dashboard/user-home.component';
import {ProfileComponent} from '../../components/user/dashboard/profile/profile.component';
import {
  OrderSummaryListComponent
} from '../../components/user/dashboard/orders/summary-list/list/order-summary-list.component';
import {OrderComponent} from '../../components/user/dashboard/orders/order-item/order.component';
import {UserSettingsComponent} from '../../components/user/dashboard/settings/user-settings.component';
import {CheckoutFormComponent} from '../../components/user/checkout/checkout-form.component';
import {StepOneWhoComponent} from '../../components/user/checkout/steps/1-step-one-who/step-one-who.component';
import {StepTwoWhereComponent} from '../../components/user/checkout/steps/2-step-two-where/step-two-where.component';
import {StepThreeWhenComponent} from '../../components/user/checkout/steps/3-step-three-when/step-three-when.component';
import {StepFourHowComponent} from '../../components/user/checkout/steps/4-step-four-how/step-four-how.component';
import {
  StepFiveSummaryComponent
} from '../../components/user/checkout/steps/5-step-five-summary/step-five-summary.component';
import {NewOrderSuccessComponent} from '../../components/user/checkout/success/new-order-success.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {ErrorComponent} from './error/error.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {AdminHomeComponent} from '../../components/admin/admin-home.component';

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
    path: "registration",
    component: RegisterComponent,
    title: "Create your account"
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
    path: "admin",
    title: "Administrator",
    component: AdminHomeComponent,
    children: []
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
