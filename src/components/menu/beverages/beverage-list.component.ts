import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {LoadingAnimationService} from '../../../services/animation/loading-animation.service';
import {toObservable} from '@angular/core/rxjs-interop';
import {ProductItemComponent} from '../products/product-item/product-item.component';
import {QueryResult} from '../../../utils/interfaces/query';
import {ErrorService} from '../../../services/error/error.service';
import {ERROR, PENDING, SUCCESS} from '../../../utils/constants';
import {ResponseDTO} from '../../../utils/interfaces/http/api';
import {FilterService} from '../../../services/filter/filter.service';
import {ProductsSearchComponent} from '../products/search/products-search.component';
import {ProductsSearchPipe} from '../products/search/search-pipe/products-search.pipe';
import {ProductsFilterComponent} from '../products/filters/products-filter.component';
import {getAllBeverageFilters} from '../../../utils/filter-items';
import {ServerErrorComponent} from '../../../app/routes/error/server-no-response/server-error.component';
import {isPlatformBrowser, NgForOf} from '@angular/common';
import {Paginator, PaginatorState} from 'primeng/paginator';
import {Skeleton} from 'primeng/skeleton';
import {tempQueryResult, tempStatus$} from '../../../utils/placeholder';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {RESOURCE_BEVERAGE, RESOURCE_PRODUCT_BEVERAGE} from '../../../utils/query-keys';
import {lastValueFrom} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ResourcesHttpService} from '../../../services/http/resources/resources-http.service';
import {TranslatePipe} from '@ngx-translate/core';

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
    TranslatePipe,
  ],
  templateUrl: './beverage-list.component.html',
  styleUrls: ['./beverage-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeverageListComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private isServer = !isPlatformBrowser(this.platformId);
  private loadingAnimationService = inject(LoadingAnimationService);
  private resourcesHttpService = inject(ResourcesHttpService);
  private activatedRoute = inject(ActivatedRoute);
  protected filterService = inject(FilterService);
  private errorService = inject(ErrorService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  protected filters = this.filterService.getFilters();
  private currentElements = DEFAULT_PAGE_MAX_SIZE;
  protected skeletonCount = DEFAULT_PAGE_MAX_SIZE;
  protected totalElements = 0;
  private totalPages = 0;
  protected first = 0;
  protected page = signal(this.activatedRoute.snapshot.queryParamMap.get("page") === null ? 1 : Number(this.activatedRoute.snapshot.queryParamMap.get("page")!));

  protected query: QueryResult = !this.isServer ? injectQuery(() => ({
    queryKey: [...RESOURCE_PRODUCT_BEVERAGE, this.page() - 1],
    queryFn: () => lastValueFrom(this.resourcesHttpService.findProducts(RESOURCE_BEVERAGE, this.page() - 1, DEFAULT_PAGE_MAX_SIZE))
  })) : tempQueryResult();

  private statusObservable = !this.isServer ? toObservable(this.query.status) : tempStatus$();

  ngOnInit() {
    this.first = (this.page() - 1) * DEFAULT_PAGE_MAX_SIZE;

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
              this.totalPages = response.payload.totalPages;
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

  protected onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    const nextPage = event.page === undefined ? 1 : event.page + 1;
    this.skeletonCount = this.countSkeletons(this.page(), nextPage);
    this.page.set(nextPage);
    this.router.navigate(["pizzas"], {queryParams: {page: nextPage}});
  }

  private countSkeletons(currentPage: number, nextPage: number) {
    if (nextPage < this.totalPages) {
      return DEFAULT_PAGE_MAX_SIZE;
    }

    if (nextPage === this.totalPages) {
      return this.totalElements - (this.currentElements * currentPage);
    }

    return DEFAULT_PAGE_MAX_SIZE;
  }

  protected readonly getAllBeverageFilters = getAllBeverageFilters;
}
