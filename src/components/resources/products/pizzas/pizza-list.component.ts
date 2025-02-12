import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ProductItemComponent} from '../product-item/product-item.component';
import {LoadingAnimationService} from '../../../../services/navigation/loading-animation.service';
import {RESOURCE_PRODUCT_PIZZA} from '../../../../utils/query-keys';
import {toObservable} from '@angular/core/rxjs-interop';
import {ResourceService} from '../../../../services/http/resources/resource.service';
import {QueryResult} from '../../../../interfaces/query';
import {ServerErrorComponent} from '../../../app/error/server-no-response/server-error.component';
import {ErrorService} from '../../../../services/error/error.service';
import {ERROR, PENDING, SUCCESS} from '../../../../utils/constants';
import {ResponseDTO} from '../../../../interfaces/http/api';
import {card} from '../../../../primeng/card';
import {ProductsFilterComponent} from '../filter/products-filter.component';
import {ProductsSearchPipe} from '../search/products-search.pipe';
import {ProductsSearchComponent} from '../search/products-search.component';
import {FilterService} from '../../../../services/filter/filter.service';
import {getAllPizzaFilters} from '../../../../utils/filter-items';

@Component({
  selector: 'app-pizza-list',
  host: {
    class: 'upper-layout',
  },
  imports: [
    ProductsSearchComponent,
    ProductsFilterComponent,
    ProductsSearchPipe,
    ProductItemComponent,
    ServerErrorComponent
  ],
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaListComponent implements OnInit {
  private resourceService = inject(ResourceService);
  private loadingAnimationService = inject(LoadingAnimationService);
  private destroyRef = inject(DestroyRef);
  private errorService = inject(ErrorService);
  protected filterService = inject(FilterService);
  protected query: QueryResult = this.resourceService.findProducts({queryKey: RESOURCE_PRODUCT_PIZZA});
  private statusObservable = toObservable(this.query.status);
  filters = this.filterService.getFilters();
  searchText = this.filterService.getSearchText();

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
            if (response.status.error) {
              this.errorService.handleError(response);
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

  protected readonly card = card;
  protected readonly getAllPizzaFilters = getAllPizzaFilters;
}
