import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnDestroy, OnInit, Signal} from '@angular/core';
import {CheckoutFormService} from '../../../../services/checkout/checkout-form.service';
import {Button} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../../services/auth/auth.service';
import {CartService} from '../../../../services/cart/cart.service';
import {TranslatePipe} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';
import {CartComponent} from '../../../cart/sidebar/cart.component';
import {ResourceService} from '../../../../services/http/resources/resource.service';
import {RESOURCE_PRODUCT_ALL} from '../../../../utils/query-keys';
import {toObservable} from '@angular/core/rxjs-interop';
import {ProductDTO} from '../../../../interfaces/dto/resources';
import {LoadingAnimationService} from '../../../../services/navigation/loading-animation.service';
import {CustomerDetailsComponent} from '../../../user/orders/order-item/customer-details/customer-details.component';
import {AddressDetailsComponent} from '../../../user/orders/order-item/address-details/address-details.component';
import {OrderDetailsComponent} from '../../../user/orders/order-item/order-details/order-details.component';

@Component({
  selector: 'app-new-order-success',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [
    Button,
    CustomerDetailsComponent,
    AddressDetailsComponent,
    OrderDetailsComponent,
    RouterLink,
    TranslatePipe,
    UpperCasePipe,
    CartComponent
  ],
  templateUrl: './new-order-success.component.html',
  styleUrl: './new-order-success.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewOrderSuccessComponent implements OnInit, OnDestroy {
  protected checkoutFormService = inject(CheckoutFormService);
  private loadingAnimationService = inject(LoadingAnimationService);
  private resourceService = inject(ResourceService);
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private router = inject(Router);
  isAuthenticated: Signal<boolean> = this.authService.getIsAuthenticated();
  allProducts = this.resourceService.findAllProducts({queryKey: RESOURCE_PRODUCT_ALL});
  status = toObservable(this.allProducts.status);

  goBack() {
    this.router.navigate(['/pizzas']);
  }

  ngOnInit(): void {
    if (this.checkoutFormService.orderSuccess()) {
      const subscription = this.status.subscribe(status => {
        if (status === "pending") {
          this.loadingAnimationService.startLoading();
        }

        if (status === "error") {
          this.loadingAnimationService.stopLoading();
        }

        if (status === "success") {
          this.loadingAnimationService.stopLoading();
          const cart = this.checkoutFormService.orderSuccess()!.cart!;
          const allProducts = this.allProducts.data()!.payload as ProductDTO[];
          this.cartService.set(cart.cartItems, cart.totalQuantity, cart.totalCost, true, allProducts);
        }
      });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }

  ngOnDestroy(): void {
    this.cartService.clear();
  }
}
