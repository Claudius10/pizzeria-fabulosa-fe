import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ProductItemComponent} from '../product-item/product-item.component';
import {NavigationService} from '../../../../services/navigation/navigation.service';
import {RESOURCE_PRODUCT_PIZZA} from '../../../../utils/query-keys';
import {toObservable} from '@angular/core/rxjs-interop';
import {ResourceService} from '../../../../services/http/resources/resource.service';
import {ProductsQueryResult} from '../../../../interfaces/query';

@Component({
  selector: 'app-pizza-list',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [
    ProductItemComponent
  ],
  templateUrl: './pizza-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaListComponent implements OnInit {
  private resourceService = inject(ResourceService);
  private navigationService = inject(NavigationService);
  private destroyRef = inject(DestroyRef);
  protected query: ProductsQueryResult = this.resourceService.findProducts({queryKey: RESOURCE_PRODUCT_PIZZA});
  private statusObservable = toObservable(this.query.status);

  ngOnInit(): void {
    const subscription = this.statusObservable.subscribe({
      next: result => {
        if (result === "pending") {
          this.navigationService.setIsLoading(true);
        } else {
          this.navigationService.setIsLoading(false);
        }
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
