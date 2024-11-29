import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {NavigationService} from '../../../../services/navigation/navigation.service';
import {RESOURCE_PRODUCT_BEVERAGES} from '../../../../utils/query-keys';
import {toObservable} from '@angular/core/rxjs-interop';
import {ResourceService} from '../../../../services/http/resources/resource.service';
import {ProductsQueryResult} from '../../../../interfaces/query';
import {ProductItemComponent} from '../product-item/product-item.component';

@Component({
  selector: 'app-beverage-list',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [
    ProductItemComponent
  ],
  templateUrl: './beverage-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeverageListComponent implements OnInit {
  private resourceService = inject(ResourceService);
  private navigationService = inject(NavigationService);
  private destroyRef = inject(DestroyRef);
  protected query: ProductsQueryResult = this.resourceService.findProducts({queryKey: RESOURCE_PRODUCT_BEVERAGES});
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
