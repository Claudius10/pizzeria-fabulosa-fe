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
  // descriptionFilters = this.filterService.getDescriptionFilters();
  // allergenFilters = this.filterService.getAllergenFilters();
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
    header: "component.products.filters.include.meat",
    items:
      [
        'component.products.filters.include.meat.bacon',
        'component.products.filters.include.meat.double.bacon',
        'component.products.filters.include.meat.pepperoni',
        'component.products.filters.include.meat.double.pepperoni',
        'component.products.filters.include.meat.beef',
        'component.products.filters.include.meat.york.ham',
        'component.products.filters.include.meat.chicken'
      ]
  };
}

function getCheeseFilterItems() {
  return {
    header: "component.products.filters.include.cheese",
    items:
      [
        'component.products.filters.include.cheese.parmesan',
        'component.products.filters.include.cheese.emmental',
        'component.products.filters.include.cheese.blue',
        'component.products.filters.include.cheese.goat',
        'component.products.filters.include.cheese.mozzarella',
        'component.products.filters.include.cheese.double.mozzarella',
      ]
  };
}

function getVegetablesFilterItems() {
  return {
    header: "component.products.filters.include.vegetable",
    items:
      [
        'component.products.filters.include.vegetables.zucchini',
        'component.products.filters.include.vegetables.tomato',
        'component.products.filters.include.vegetables.onion',
        'component.products.filters.include.vegetables.mushroom',
        'component.products.filters.include.vegetables.eggplant',
        'component.products.filters.include.vegetables.olives.black',
      ]
  };
}

function getSauceFilterItems() {
  return {
    header: "component.products.filters.include.sauce",
    items:
      [
        'component.products.filters.include.sauce.tomato',
        'component.products.filters.include.sauce.cream',
      ]
  };
}

function getOthersFilterItems() {
  return {
    header: "component.products.filters.include.oil",
    items:
      [
        'component.products.filters.include.oil.truffle',
      ]
  };
}

function getAllergenFilterItems() {
  return {
    header: "component.products.filters.exclude.allergen",
    items:
      [
        'component.products.filters.exclude.allergen.gluten',
        'component.products.filters.exclude.allergen.lactose',
        'component.products.filters.exclude.allergen.soy',
        'component.products.filters.exclude.allergen.eggs',
        'component.products.filters.exclude.allergen.mustard',
      ]
  };
}
