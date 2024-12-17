import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnDestroy, OnInit} from '@angular/core';
import {LoadingAnimationService} from '../../../../services/navigation/loading-animation.service';
import {RESOURCE_PRODUCT_BEVERAGES} from '../../../../utils/query-keys';
import {toObservable} from '@angular/core/rxjs-interop';
import {ResourceService} from '../../../../services/http/resources/resource.service';
import {ProductItemComponent} from '../product-item/product-item.component';
import {QueryResult} from '../../../../interfaces/query';

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
export class BeverageListComponent implements OnInit, OnDestroy {
  private resourceService = inject(ResourceService);
  private loadingAnimationService = inject(LoadingAnimationService);
  private destroyRef = inject(DestroyRef);
  protected query: QueryResult = this.resourceService.findProducts({queryKey: RESOURCE_PRODUCT_BEVERAGES});
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
    });
  }

  ngOnDestroy(): void {
    this.loadingAnimationService.stopLoading();
  }
}
