import {Routes} from '@angular/router';
import {PizzaListComponent} from '../menu/pizzas/pizza-list.component';
import {HomeComponent} from '../home/home.component';
import {userCredentialsGuardGuard} from '../guard/user/user-credentials-guard.guard';
import {BeverageListComponent} from '../menu/beverages/beverage-list.component';
import {RegisterComponent} from '../register/register.component';
import {UserHomeComponent} from '../users/user/user-home.component';
import {ProfileComponent} from '../users/user/profile/profile.component';
import {OrderSummaryListComponent} from '../users/user/orders/summary-list/list/order-summary-list.component';
import {OrderComponent} from '../users/user/orders/order-item/order.component';
import {CheckoutFormComponent} from '../checkout/checkout-form.component';
import {StepOneWhoComponent} from '../checkout/steps/1-step-one-who/step-one-who.component';
import {StepTwoWhereComponent} from '../checkout/steps/2-step-two-where/step-two-where.component';
import {StepThreeWhenComponent} from '../checkout/steps/3-step-three-when/step-three-when.component';
import {StepFourHowComponent} from '../checkout/steps/4-step-four-how/step-four-how.component';
import {StepFiveSummaryComponent} from '../checkout/steps/5-step-five-summary/step-five-summary.component';
import {NewOrderSuccessComponent} from '../checkout/success/new-order-success.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {ErrorComponent} from './error/error.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {adminRoleGuard} from '../guard/admin/admin-role.guard';
import {AdminHomeComponent} from '../users/admin/admin-home.component';
import {AuthorizingPlaceholderComponent} from './auth/authorizing-placeholder.component';

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
    component: AdminHomeComponent,
    canMatch: [adminRoleGuard],
    loadChildren: () => import('./admin.routes').then(m => m.ADMIN_ROUTES)
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
    path: "authorizing",
    component: AuthorizingPlaceholderComponent,
    title: "Authorizing",
  },
  {
    path: "**",
    component: NotFoundComponent,
    title: "Not Found",
  }
];
