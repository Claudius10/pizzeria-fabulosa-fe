import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ProductItemComponent} from '../product-item/product-item.component';
import {LoadingAnimationService} from '../../../services/animation/loading-animation.service';
import {RESOURCE_PRODUCT_PIZZA} from '../../../utils/query-keys';
import {toObservable} from '@angular/core/rxjs-interop';
import {ResourceService} from '../../../services/http/resources/resource.service';
import {QueryResult} from '../../../interfaces/query';
import {ErrorService} from '../../../services/error/error.service';
import {ERROR, PENDING, SUCCESS} from '../../../utils/constants';
import {ResponseDTO} from '../../../interfaces/http/api';
import {ProductsFilterComponent} from '../filters/products-filter.component';
import {ProductsSearchPipe} from '../search/search-pipe/products-search.pipe';
import {ProductsSearchComponent} from '../search/products-search.component';
import {FilterService} from '../../../services/filter/filter.service';
import {getAllPizzaFilters} from '../../../utils/filter-items';
import {CustomPizzaComponent} from '../custom/custom-pizza/custom-pizza.component';
import {ServerErrorComponent} from '../../../app/routes/error/server-no-response/server-error.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-pizza-list',
  host: {
    class: 'upper-layout',
  },
  imports: [
    ProductsSearchComponent,
    ProductsFilterComponent,
    ProductItemComponent,
    ProductsSearchPipe,
    CustomPizzaComponent,
    ServerErrorComponent,
    ServerErrorComponent,
    NgClass
  ],
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaListComponent implements OnInit {
  private loadingAnimationService = inject(LoadingAnimationService);
  private resourceService = inject(ResourceService);
  protected filterService = inject(FilterService);
  private errorService = inject(ErrorService);
  private destroyRef = inject(DestroyRef);
  protected query: QueryResult = this.resourceService.findProducts({queryKey: RESOURCE_PRODUCT_PIZZA});
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

  protected readonly getAllPizzaFilters = getAllPizzaFilters;
}
