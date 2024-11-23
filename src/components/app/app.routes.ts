import {Routes} from '@angular/router';
import {ProductListComponent} from '../products/product-list/product-list.component';
import {MenuComponent} from '../menu/menu.component';
import {HomeComponent} from '../home/home.component';
import {RegisterComponent} from '../forms/register/register.component';
import {LoginComponent} from '../forms/login/login.component';
import {NotFoundComponent} from '../wildcard-routes/not-found/not-found.component';
import {ForbiddenComponent} from '../wildcard-routes/forbidden/forbidden.component';
import {UserHomeComponent} from '../user/home/user-home.component';
import {userCredentialsGuardGuard} from '../user/guard/user-credentials-guard.guard';
import {ProfileComponent} from '../user/profile/profile.component';
import {OrderSummaryListComponent} from '../user/order-summary-list/order-summary-list.component';
import {SettingsComponent} from '../user/settings/settings.component';
import {CheckoutComponent} from '../checkout/checkout.component';
import {OrderComponent} from '../user/order/order.component';
import {resolveBeverages, resolvePizzas} from './resolvers';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "menu",
    component: MenuComponent,
    title: "Menu",
    children: [
      {
        path: "pizzas",
        component: ProductListComponent,
        title: "Pizzas",
        resolve: {
          query: resolvePizzas
        }
      },
      {
        path: "bebidas",
        component: ProductListComponent,
        title: "Bebidas",
        resolve: {
          query: resolveBeverages
        }
      }
    ]
  },
  {
    path: "usuario",
    component: UserHomeComponent,
    canMatch: [userCredentialsGuardGuard],
    children: [
      {
        path: "perfil",
        component: ProfileComponent,
        title: "Tu perfil",
      },
      {
        path: "pedidos",
        component: OrderSummaryListComponent,
        title: "Tus pedidos",
      },
      {
        path: "pedidos/:orderId",
        component: OrderComponent,
        title: "Tu pedido",
        pathMatch: "full",
      },
      {
        path: "configuracion",
        component: SettingsComponent,
        title: "Configuracion",
      }
    ]
  },
  {
    path: "pedido-nuevo",
    component: CheckoutComponent,
    title: "Pedido Nuevo",
  },
  {
    path: "registracion-usuario",
    component: RegisterComponent,
    title: "Crea tu cuenta"
  },
  {
    path: "iniciar-sesion",
    component: LoginComponent,
    title: "Inicia sesión"
  },
  {
    path: "acceso-denegado",
    component: ForbiddenComponent,
    title: "Acceso denegado",
  },
  {
    path: "**",
    component: NotFoundComponent,
    title: "Nos hemos perdido"
  }
];
