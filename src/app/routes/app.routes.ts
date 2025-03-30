import {Routes} from '@angular/router';
import {PizzaListComponent} from '../../components/menu/pizzas/pizza-list.component';
import {HomeComponent} from '../../components/home/home.component';
import {userCredentialsGuardGuard} from '../../components/user/guard/user-credentials-guard.guard';
import {BeverageListComponent} from '../../components/menu/beverages/beverage-list.component';
import {RegisterComponent} from '../../components/register/register.component';

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
    loadComponent: () => import('../../components/user/user-home.component').then(c => c.UserHomeComponent),
    canMatch: [userCredentialsGuardGuard],
    children: [
      {
        path: "profile",
        loadComponent: () => import('../../components/user/profile/profile.component').then(c => c.ProfileComponent),
        title: "Profile",
      },
      {
        path: "orders",
        loadComponent: () => import('../../components/user/orders/summary-list/list/order-summary-list.component').then(c => c.OrderSummaryListComponent),
        title: "Order History",
      },
      {
        path: "orders/:orderId",
        loadComponent: () => import('../../components/user/orders/order-item/order.component').then(c => c.OrderComponent),
        title: "Order Review",
        pathMatch: "full",
      },
      {
        path: "settings",
        loadComponent: () => import('../../components/user/settings/user-settings.component').then(c => c.UserSettingsComponent),
        title: "Account Settings",
      }
    ]
  },
  {
    path: "order",
    children: [
      {
        path: "new",
        loadComponent: () => import('../../components/checkout/checkout-form.component').then(c => c.CheckoutFormComponent),
        title: "New Order",
        children: [
          {
            path: "step-one",
            loadComponent: () => import('../../components/checkout/steps/1-step-one-who/step-one-who.component').then(c => c.StepOneWhoComponent),
            title: "New order: step one",
          },
          {
            path: "step-two",
            loadComponent: () => import('../../components/checkout/steps/2-step-two-where/step-two-where.component').then(c => c.StepTwoWhereComponent),
            title: "New order: step two",
          },
          {
            path: "step-three",
            loadComponent: () => import('../../components/checkout/steps/3-step-three-when/step-three-when.component').then(c => c.StepThreeWhenComponent),
            title: "New order: step three",
          },
          {
            path: "step-four",
            loadComponent: () => import('../../components/checkout/steps/4-step-four-how/step-four-how.component').then(c => c.StepFourHowComponent),
            title: "New order: step four",
          },
          {
            path: "step-five",
            loadComponent: () => import('../../components/checkout/steps/5-step-five-summary/step-five-summary.component').then(c => c.StepFiveSummaryComponent),
            title: "New order: step five",
          }
        ]
      },
      {
        path: "success",
        loadComponent: () => import('../../components/checkout/success/new-order-success.component').then(c => c.NewOrderSuccessComponent),
        title: "New order: Success",
      }
    ]
  },
  {
    path: "forbidden",
    loadComponent: () => import('../../app/routes/forbidden/forbidden.component').then(c => c.ForbiddenComponent),
    title: "Access forbidden",
  },
  {
    path: "error",
    loadComponent: () => import('../../app/routes/error/error.component').then(c => c.ErrorComponent),
    title: "Unexpected Error",
  },
  {
    path: "**",
    loadComponent: () => import('../../app/routes/not-found/not-found.component').then(c => c.NotFoundComponent),
    title: "Not Found",
  }
];
