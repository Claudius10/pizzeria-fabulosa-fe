import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {LoadingAnimationService} from '../../services/animation/loading-animation.service';
import {toObservable} from '@angular/core/rxjs-interop';
import {ProductItemComponent} from '../products/product-item/product-item.component';
import {ErrorService} from '../../services/error/error.service';
import {ERROR, PENDING, SUCCESS} from '../../../utils/constants';
import {FilterService} from '../../services/filter/filter.service';
import {ProductsSearchComponent} from '../products/search/products-search.component';
import {ProductsSearchPipe} from '../products/search/search-pipe/products-search.pipe';
import {ProductsFilterComponent} from '../products/filters/products-filter.component';
import {getAllBeverageFilters} from '../../../utils/filter-items';
import {ServerErrorComponent} from '../../routes/error/server-no-response/server-error.component';
import {isPlatformBrowser} from '@angular/common';
import {Paginator, PaginatorState} from 'primeng/paginator';
import {Skeleton} from 'primeng/skeleton';
import {tempQueryResult, tempStatus$} from '../../../utils/placeholder';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {RESOURCE_BEVERAGE, RESOURCE_PRODUCT_BEVERAGE} from '../../../utils/query-keys';
import {lastValueFrom} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {QueryResult} from '../../../utils/interfaces/query';
import {ProductAPIService, ProductListDTO} from '../../../api/public';

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
    Skeleton,
    TranslatePipe,
  ],
  templateUrl: './beverage-list.component.html',
  styleUrls: ['./beverage-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeverageListComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isServer = !isPlatformBrowser(this.platformId);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly errorService = inject(ErrorService);
  private readonly loadingAnimationService = inject(LoadingAnimationService);
  private readonly productAPI = inject(ProductAPIService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly filterService = inject(FilterService);
  private readonly page = signal(this.activatedRoute.snapshot.queryParamMap.get("page") === null ? 1 : Number(this.activatedRoute.snapshot.queryParamMap.get("page")!));
  protected readonly searchByText = this.filterService.getSearchByText();
  protected readonly filters = this.filterService.getFilters();
  protected readonly getAllBeverageFilters = getAllBeverageFilters;

  protected readonly query: QueryResult<ProductListDTO | undefined> = !this.isServer ? injectQuery(() => ({
    queryKey: [...RESOURCE_PRODUCT_BEVERAGE, this.page() - 1],
    queryFn: () => lastValueFrom(this.productAPI.findAllByType(RESOURCE_BEVERAGE, this.page() - 1, DEFAULT_PAGE_MAX_SIZE))
  })) : tempQueryResult();
  private readonly statusObservable = !this.isServer ? toObservable(this.query.status) : tempStatus$();

  private readonly currentElements = signal(DEFAULT_PAGE_MAX_SIZE);
  private readonly totalPages = signal(0);
  protected readonly skeletonCount = signal(DEFAULT_PAGE_MAX_SIZE);
  protected readonly totalElements = signal(0);
  protected readonly first = signal(0);

  ngOnInit() {
    this.first.set((this.page() - 1) * DEFAULT_PAGE_MAX_SIZE); // NOTE - when page 2 is refreshed, paginator page number is set to 2, instead of returning to default 1

    const subscription = this.statusObservable.subscribe({
        next: result => {
          if (result === PENDING) {
            this.loadingAnimationService.startLoading();
          }

          if (result === ERROR) {
            this.loadingAnimationService.stopLoading();
            this.errorService.handleError(this.query.error()!);
          }

          if (result === SUCCESS) {
            this.loadingAnimationService.stopLoading();
            const response: ProductListDTO = this.query.data()!;
            this.totalElements.set(response.totalElements);
            this.currentElements.set(response.content.length);
            this.totalPages.set(response.number);
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
    this.first.set(event.first ?? 0);
    const nextPage = event.page === undefined ? 1 : event.page + 1;
    this.skeletonCount.set(this.countSkeletons(this.page(), nextPage));
    this.page.set(nextPage);
    this.router.navigate(["pizzas"], {queryParams: {page: nextPage}});
  }

  private countSkeletons(currentPage: number, nextPage: number) {
    if (nextPage < this.totalPages()) {
      return DEFAULT_PAGE_MAX_SIZE;
    }

    if (nextPage === this.totalPages()) {
      return this.totalElements() - (this.currentElements() * currentPage);
    }

    return DEFAULT_PAGE_MAX_SIZE;
  }

  protected setSearchByText(text: string) {
    this.filterService.setSearchByText(text);
  }
}
