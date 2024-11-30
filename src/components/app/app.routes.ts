import {Routes} from '@angular/router';
import {PizzaListComponent} from '../front/products/pizzas/pizza-list.component';
import {HomeComponent} from '../front/home/home.component';
import {RegisterComponent} from '../forms/register/register.component';
import {NotFoundComponent} from './wildcard-routes/not-found/not-found.component';
import {ForbiddenComponent} from './wildcard-routes/forbidden/forbidden.component';
import {UserHomeComponent} from '../user/home/user-home.component';
import {userCredentialsGuardGuard} from '../user/guard/user-credentials-guard.guard';
import {ProfileComponent} from '../user/profile/profile.component';
import {OrderSummaryListComponent} from '../user/order-summary-list/order-summary-list.component';
import {SettingsComponent} from '../user/settings/settings.component';
import {OrderComponent} from '../user/order/order.component';
import {BeverageListComponent} from '../front/products/beverages/beverage-list.component';
import {AnonUserCheckoutFormComponent} from '../forms/checkout/AnonUserCheckoutForm/anon-user-checkout-form.component';

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
    path: "new-order",
    component: AnonUserCheckoutFormComponent,
    title: "New Order",
  },
  {
    path: "new-user",
    component: RegisterComponent,
    title: "Create your account"
  },
  {
    path: "access-denied",
    component: ForbiddenComponent,
    title: "403 Access forbidden",
  },
  {
    path: "**",
    component: NotFoundComponent,
    title: "404 Not Found",
  }
];
