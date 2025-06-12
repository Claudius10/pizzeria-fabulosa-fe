import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {ProductItemComponent} from '../products/product-item/product-item.component';
import {LoadingAnimationService} from '../../../services/animation/loading-animation.service';
import {toObservable} from '@angular/core/rxjs-interop';
import {ErrorService} from '../../../services/error/error.service';
import {ERROR, PENDING, SUCCESS} from '../../../utils/constants';
import {ProductsFilterComponent} from '../products/filters/products-filter.component';
import {ProductsSearchPipe} from '../products/search/search-pipe/products-search.pipe';
import {ProductsSearchComponent} from '../products/search/products-search.component';
import {FilterService} from '../../../services/filter/filter.service';
import {getAllPizzaFilters} from '../../../utils/filter-items';
import {CustomPizzaComponent} from './custom/custom-pizza/custom-pizza.component';
import {ServerErrorComponent} from '../../../app/routes/error/server-no-response/server-error.component';
import {isPlatformBrowser, NgForOf} from '@angular/common';
import {Paginator, PaginatorState} from 'primeng/paginator';
import {Skeleton} from 'primeng/skeleton';
import {ActivatedRoute, Router} from '@angular/router';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {tempQueryResult, tempStatus$} from '../../../utils/placeholder';
import {RESOURCE_PIZZA, RESOURCE_PRODUCT_PIZZA} from '../../../utils/query-keys';
import {TranslatePipe} from '@ngx-translate/core';
import {QueryResult} from '../../../utils/interfaces/query';
import {ProductAPIService, ProductListDTO} from '../../../api/asset';

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
    NgForOf,
    TranslatePipe
  ],
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaListComponent implements OnInit {
  protected filterService = inject(FilterService);
  protected filters = this.filterService.getFilters();
  protected skeletonCount = DEFAULT_PAGE_MAX_SIZE + 1;
  protected totalElements = 0;
  protected first = 0;
  protected readonly getAllPizzaFilters = getAllPizzaFilters;
  private platformId = inject(PLATFORM_ID);
  private isServer = !isPlatformBrowser(this.platformId);
  private loadingAnimationService = inject(LoadingAnimationService);
  private productAPI = inject(ProductAPIService);
  protected query: QueryResult<ProductListDTO | undefined> = !this.isServer ? injectQuery(() => ({
    queryKey: [...RESOURCE_PRODUCT_PIZZA, this.page() - 1],
    queryFn: () => lastValueFrom(this.productAPI.findAllByType(RESOURCE_PIZZA, this.page() - 1, DEFAULT_PAGE_MAX_SIZE))
  })) : tempQueryResult();
  private activatedRoute = inject(ActivatedRoute);
  protected page = signal(this.activatedRoute.snapshot.queryParamMap.get("page") === null ? 1 : Number(this.activatedRoute.snapshot.queryParamMap.get("page")!));
  private errorService = inject(ErrorService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private currentElements = DEFAULT_PAGE_MAX_SIZE;
  private totalPages = 0;
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
            this.errorService.handleError(this.query.error()!);
          }

          if (result === SUCCESS) {
            this.loadingAnimationService.stopLoading();
            const response: ProductListDTO = this.query.data()!;
            this.totalElements = response.totalElements;
            this.currentElements = response.content.length;
            this.totalPages = response.number;
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
      if (nextPage !== 1) {
        return DEFAULT_PAGE_MAX_SIZE;
      } else {
        return DEFAULT_PAGE_MAX_SIZE + 1; // first page is + 1 to account for the custom pizza item
      }
    }

    if (nextPage === this.totalPages) {
      return this.totalElements - (this.currentElements * currentPage);
    }

    return DEFAULT_PAGE_MAX_SIZE;
  }
}
