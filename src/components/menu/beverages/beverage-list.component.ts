import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {LoadingAnimationService} from '../../../services/animation/loading-animation.service';
import {toObservable} from '@angular/core/rxjs-interop';
import {ResourceService} from '../../../services/http/resources/resource.service';
import {ProductItemComponent} from '../products/product-item/product-item.component';
import {QueryResult} from '../../../interfaces/query';
import {ErrorService} from '../../../services/error/error.service';
import {ERROR, PENDING, SUCCESS} from '../../../utils/constants';
import {ResponseDTO} from '../../../interfaces/http/api';
import {FilterService} from '../../../services/filter/filter.service';
import {ProductsSearchComponent} from '../products/search/products-search.component';
import {ProductsSearchPipe} from '../products/search/search-pipe/products-search.pipe';
import {ProductsFilterComponent} from '../products/filters/products-filter.component';
import {getAllBeverageFilters} from '../../../utils/filter-items';
import {ServerErrorComponent} from '../../../app/routes/error/server-no-response/server-error.component';
import {NgForOf} from '@angular/common';
import {Paginator, PaginatorState} from 'primeng/paginator';
import {Skeleton} from 'primeng/skeleton';

const DEFAULT_PAGE_MAX_SIZE = 8;

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
    Paginator,
    NgForOf,
    Skeleton,
  ],
  templateUrl: './beverage-list.component.html',
  styleUrls: ['./beverage-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeverageListComponent implements OnInit {
  private loadingAnimationService = inject(LoadingAnimationService);
  private resourceService = inject(ResourceService);
  protected filterService = inject(FilterService);
  private errorService = inject(ErrorService);
  private destroyRef = inject(DestroyRef);
  protected filters = this.filterService.getFilters();
  protected first = 0;
  protected totalElements = 0;
  protected maxItems = DEFAULT_PAGE_MAX_SIZE;
  protected currentElements = DEFAULT_PAGE_MAX_SIZE;
  protected skeletonCount = DEFAULT_PAGE_MAX_SIZE;
  protected pageSizeOptions: number[] = [DEFAULT_PAGE_MAX_SIZE];
  protected query: QueryResult = this.resourceService.findProducts("beverage");
  private statusObservable = toObservable(this.query.status);

  ngOnInit() {
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
                this.pageSizeOptions = [DEFAULT_PAGE_MAX_SIZE, 10, 20];
              }

              if (this.totalElements > 20) {
                this.pageSizeOptions = [DEFAULT_PAGE_MAX_SIZE, 10, 20, 30];
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
    this.resourceService.setPageSize(this.maxItems);
  }

  private countSkeletons() {
    if (this.maxItems > this.totalElements) {
      return this.totalElements;
    } else {
      return this.totalElements - this.currentElements;
    }
  }

  protected readonly getAllBeverageFilters = getAllBeverageFilters;
}
