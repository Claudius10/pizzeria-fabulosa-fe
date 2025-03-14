import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnDestroy, OnInit} from '@angular/core';
import {LoadingAnimationService} from '../../../services/animation/loading-animation.service';
import {RESOURCE_PRODUCT_BEVERAGES} from '../../../utils/query-keys';
import {toObservable} from '@angular/core/rxjs-interop';
import {ResourceService} from '../../../services/http/resources/resource.service';
import {ProductItemComponent} from '../product-item/product-item.component';
import {QueryResult} from '../../../interfaces/query';
import {ErrorService} from '../../../services/error/error.service';
import {ERROR, PENDING, SUCCESS} from '../../../utils/constants';
import {ResponseDTO} from '../../../interfaces/http/api';
import {FilterService} from '../../../services/filter/filter.service';
import {ProductsSearchComponent} from '../search/products-search.component';
import {ProductsSearchPipe} from '../search/search-pipe/products-search.pipe';
import {ProductsFilterComponent} from '../filters/products-filter.component';
import {getAllBeverageFilters, getAllPizzaFilters} from '../../../utils/filter-items';
import {ServerErrorComponent} from '../../../app/routes/error/server-no-response/server-error.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-beverage-list',
  host: {
    class: 'upper-layout',
  },
  imports: [
    ProductsSearchComponent,
    ProductsFilterComponent,
    ProductItemComponent,
    ProductsSearchPipe,
    ServerErrorComponent,
    NgClass,
  ],
  templateUrl: './beverage-list.component.html',
  styleUrls: ['./beverage-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeverageListComponent implements OnInit, OnDestroy {
  private loadingAnimationService = inject(LoadingAnimationService);
  private resourceService = inject(ResourceService);
  protected filterService = inject(FilterService);
  private errorService = inject(ErrorService);
  private destroyRef = inject(DestroyRef);
  protected query: QueryResult = this.resourceService.findProducts({queryKey: RESOURCE_PRODUCT_BEVERAGES});
  private statusObservable = toObservable(this.query.status);
  filters = this.filterService.getFilters();

  ngOnInit(): void {
    const subscription = this.statusObservable.subscribe({
        next: result => {
          if (result === PENDING) {
            this.loadingAnimationService.startLoading();
          }

          if (result === ERROR) {
            this.loadingAnimationService.stopLoading();
          }

          if (result === SUCCESS) {
            this.loadingAnimationService.stopLoading();
            const response: ResponseDTO = this.query.data()!;
            if (response.status.error && response.error) {
              this.errorService.handleError(response.error);
            }
          }
        }
      },
    );

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      this.loadingAnimationService.stopLoading();
      this.filterService.clear();
    });
  }

  ngOnDestroy(): void {
    this.loadingAnimationService.stopLoading();
  }

  protected readonly getAllBeverageFilters = getAllBeverageFilters;
  protected readonly getAllPizzaFilters = getAllPizzaFilters;
}
