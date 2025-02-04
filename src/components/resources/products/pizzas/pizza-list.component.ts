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
  protected readonly getAllFilters = getAllFilters;
}

function getAllFilters() {
  return [getMeatFilterItems(), getCheeseFilterItems(), getVegetablesFilterItems(), getSauceFilterItems(), getOthersFilterItems(), getAllergenFilterItems()];
}

function getMeatFilterItems() {
  return {
    header: "component.products.filters.meat",
    items:
      [
        'component.products.filters.meat.bacon',
        'component.products.filters.meat.double.bacon',
        'component.products.filters.meat.pepperoni',
        'component.products.filters.meat.double.pepperoni',
        'component.products.filters.meat.beef',
        'component.products.filters.meat.york.ham',
        'component.products.filters.meat.chicken'
      ]
  };
}

function getCheeseFilterItems() {
  return {
    header: "component.products.filters.cheese",
    items:
      [
        'component.products.filters.cheese.parmesan',
        'component.products.filters.cheese.emmental',
        'component.products.filters.cheese.blue',
        'component.products.filters.cheese.goat',
        'component.products.filters.cheese.mozzarella',
        'component.products.filters.cheese.double.mozzarella',
      ]
  };
}

function getVegetablesFilterItems() {
  return {
    header: "component.products.filters.vegetable",
    items:
      [
        'component.products.filters.vegetables.zucchini',
        'component.products.filters.vegetables.tomato',
        'component.products.filters.vegetables.onion',
        'component.products.filters.vegetables.mushroom',
        'component.products.filters.vegetables.eggplant',
        'component.products.filters.vegetables.olives.black',
      ]
  };
}

function getSauceFilterItems() {
  return {
    header: "component.products.filters.sauce",
    items:
      [
        'component.products.filters.sauce.tomato',
        'component.products.filters.sauce.cream',
      ]
  };
}

function getOthersFilterItems() {
  return {
    header: "component.products.filters.oil",
    items:
      [
        'component.products.filters.oil.truffle',
      ]
  };
}

function getAllergenFilterItems() {
  return {
    header: "component.products.filters.allergen",
    items:
      [
        'component.products.filters.allergen.gluten',
        'component.products.filters.allergen.lactose',
        'component.products.filters.allergen.soy',
        'component.products.filters.allergen.eggs',
        'component.products.filters.allergen.mustard',
      ]
  };
}
