import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import {ProductItemComponent} from '../product-item/product-item.component';
import {LoadingAnimationService} from '../../../services/animation/loading-animation.service';
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
import {NgForOf} from '@angular/common';
import {Paginator, PaginatorState} from 'primeng/paginator';
import {Skeleton} from 'primeng/skeleton';

const DEFAULT_PAGE_MAX_SIZE = 7; // 7 + 1 (custom pizza) = 8

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
    Paginator,
    Skeleton,
    NgForOf
  ],
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaListComponent {
  private loadingAnimationService = inject(LoadingAnimationService);
  private resourceService = inject(ResourceService);
  protected filterService = inject(FilterService);
  private errorService = inject(ErrorService);
  private destroyRef = inject(DestroyRef);
  protected filters = this.filterService.getFilters();
  protected pageNumber = this.resourceService.getPageNumber();
  protected first = 0;
  protected totalElements = 0;
  protected maxItems = DEFAULT_PAGE_MAX_SIZE;
  protected currentElements = DEFAULT_PAGE_MAX_SIZE;
  protected skeletonCount = DEFAULT_PAGE_MAX_SIZE;
  protected pageSizeOptions: number[] = [DEFAULT_PAGE_MAX_SIZE];
  protected query: QueryResult = this.resourceService.findProducts("pizza");
  private statusObservable = toObservable(this.query.status);

  constructor() {
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
            } else {
              this.totalElements = response.payload.totalElements;
              this.currentElements = response.payload.productList.length;

              if (this.totalElements > DEFAULT_PAGE_MAX_SIZE && this.totalElements <= 10) {
                this.pageSizeOptions = [DEFAULT_PAGE_MAX_SIZE, 10];
              }

              if (this.totalElements > 10 && this.totalElements < 20) {
                this.pageSizeOptions = [10, 20];
              }

              if (this.totalElements > 20) {
                this.pageSizeOptions = [10, 20, 30];
              }
            }
          }
        }
      },
    );

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      this.loadingAnimationService.stopLoading();
      this.filterService.clear();
      this.resourceService.resetProductListArgs();
    });
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.maxItems = event.rows ?? DEFAULT_PAGE_MAX_SIZE;

    this.skeletonCount = this.countSkeletons();
    this.resourceService.setPageNumber(event.page === undefined ? 1 : event.page + 1);
    this.resourceService.setPageSizePizzas(this.maxItems);
  }

  private countSkeletons() {
    if (this.maxItems > this.totalElements) {
      return this.totalElements;
    } else {
      return this.totalElements - this.currentElements;
    }
  }

  protected readonly getAllPizzaFilters = getAllPizzaFilters;
}
