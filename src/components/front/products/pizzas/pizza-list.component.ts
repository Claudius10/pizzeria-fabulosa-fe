import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ProductItemComponent} from '../product-item/product-item.component';
import {LoadingAnimationService} from '../../../../services/navigation/loading-animation.service';
import {RESOURCE_PRODUCT_PIZZA} from '../../../../utils/query-keys';
import {toObservable} from '@angular/core/rxjs-interop';
import {ResourceService} from '../../../../services/http/resources/resource.service';
import {QueryResult} from '../../../../interfaces/query';

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
  private loadingAnimationService = inject(LoadingAnimationService);
  private destroyRef = inject(DestroyRef);
  protected query: QueryResult = this.resourceService.findProducts({queryKey: RESOURCE_PRODUCT_PIZZA});
  private statusObservable = toObservable(this.query.status);

  ngOnInit(): void {
    const subscription = this.statusObservable.subscribe({
      next: result => {
        if (result === "pending") {
          this.loadingAnimationService.startLoading();
        } else {
          this.loadingAnimationService.stopLoading();
        }
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      this.loadingAnimationService.stopLoading();
    });
  }
}
