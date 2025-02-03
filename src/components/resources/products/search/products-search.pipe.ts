import {inject, Pipe, PipeTransform} from '@angular/core';
import {ProductDTO} from '../../../../interfaces/dto/resources';
import {TranslateService} from '@ngx-translate/core';
import {Filter} from '../../../../services/filter/filter.service';

@Pipe({
  name: 'productsSearch'
})
export class ProductsSearchPipe implements PipeTransform {
  private translateService = inject(TranslateService);

  transform(items: ProductDTO[], searchText: string, filters: Filter[]): ProductDTO[] {
    if (items.length === 0) {
      return [];
    }

    const locale = this.getLocale();
    const withIncludedAllergens = this.filterByIncludedAllergens(items, this.getAllergensToInclude(filters), locale);
    const withExcludedAllergens = this.filterByExcludedAllergens(withIncludedAllergens, this.getAllergensToExclude(filters), locale);
    const withIncludedIngredients = this.filterByIncludedIngredients(withExcludedAllergens, this.getIngredientsToInclude(filters), locale);
    const withExcludedIngredients = this.filterByExcludedIngredients(withIncludedIngredients, this.getIngredientsToExclude(filters), locale);
    return searchText ? this.search(searchText, withExcludedIngredients) : withExcludedIngredients;
  }

  search(searchText: string, items: ProductDTO[]): ProductDTO[] {
    return items.filter(item => {
      return item.name.es.toLowerCase().includes(searchText);
    });
  }

  filterByIncludedAllergens(items: ProductDTO[], toInclude: Filter[], locale: string): ProductDTO[] {
    if (toInclude.length === 0) {
      return items;
    }

    const filteredItems: ProductDTO[] = [];

    items.forEach(item => {
      let included = 0;

      if (locale === 'en') {
        item.allergens.en.filter((allergen) => {

          const index = toInclude.findIndex(allergenToInclude => {
            return allergenToInclude.name === allergen;
          });

          if (index !== -1) {
            included++;
          }
        });
      } else {
        item.allergens.es.filter((allergen) => {

          const index = toInclude.findIndex(allergenToInclude => {
            return allergenToInclude.name === allergen;
          });

          if (index !== -1) {
            included++;
          }
        });
      }

      if (included === toInclude.length) {
        filteredItems.push(item);
      }
    });

    return filteredItems;
  }

  filterByIncludedIngredients(items: ProductDTO[], toInclude: Filter[], locale: string): ProductDTO[] {
    if (toInclude.length === 0) {
      return items;
    }

    const filteredItems: ProductDTO[] = [];

    items.forEach(item => {
      let included = 0;

      if (locale === 'en') {
        item.description.en.filter((ingredient) => {

          const index = toInclude.findIndex(ingredientToInclude => {
            return ingredientToInclude.name === ingredient;
          });

          if (index !== -1) {
            included++;
          }
        });
      } else {
        item.description.es.filter((ingredient) => {

          const index = toInclude.findIndex(ingredientToInclude => {
            return ingredientToInclude.name === ingredient;
          });

          if (index !== -1) {
            included++;
          }
        });
      }

      if (included === toInclude.length) {
        filteredItems.push(item);
      }
    });

    return filteredItems;
  }

  filterByExcludedAllergens(items: ProductDTO[], toExclude: Filter[], locale: string): ProductDTO[] {
    if (toExclude.length === 0) {
      return items;
    }

    const filteredItems: ProductDTO[] = [];

    items.forEach(item => {
      let includeItem = true;

      if (locale === 'en') {
        for (let i = 0; item.allergens.en.length > i; i++) {
          let allergen = item.allergens.en[i];

          const index = toExclude.findIndex(allergenToExclude => {
            return allergenToExclude.name === allergen;
          });

          if (index !== -1) {
            includeItem = false;
            break;
          }
        }
      } else {
        for (let i = 0; item.allergens.es.length > i; i++) {
          let allergen = item.allergens.en[i];

          const index = toExclude.findIndex(allergenToExclude => {
            return allergenToExclude.name === allergen;
          });

          if (index !== -1) {
            includeItem = false;
            break;
          }
        }
      }

      if (includeItem) {
        filteredItems.push(item);
      }
    });

    return filteredItems;
  }

  filterByExcludedIngredients(items: ProductDTO[], toExclude: Filter[], locale: string): ProductDTO[] {
    if (toExclude.length === 0) {
      return items;
    }

    const filteredItems: ProductDTO[] = [];

    items.forEach(item => {
      let includeItem = true;

      if (locale === 'en') {
        for (let i = 0; item.description.en.length > i; i++) {
          let ingredient = item.description.en[i];

          const index = toExclude.findIndex(ingredientToExclude => {
            return ingredientToExclude.name === ingredient;
          });

          if (index !== -1) {
            includeItem = false;
            break;
          }
        }
      } else {
        for (let i = 0; item.description.es.length > i; i++) {
          let ingredient = item.description.en[i];

          const index = toExclude.findIndex(ingredientToExclude => {
            return ingredientToExclude.name === ingredient;
          });

          if (index !== -1) {
            includeItem = false;
            break;
          }
        }
      }

      if (includeItem) {
        filteredItems.push(item);
      }
    });

    return filteredItems;
  }

  getLocale() {
    return this.translateService.currentLang;
  }

  getAllergensToInclude(filters: Filter[]): Filter[] {
    return filters.filter(filter => {
      return filter.include && filter.type === 'allergen';
    });
  }

  getAllergensToExclude(filters: Filter[]): Filter[] {
    return filters.filter(filter => {
      return !filter.include && filter.type === 'allergen';
    });
  }

  getIngredientsToInclude(filters: Filter[]): Filter[] {
    return filters.filter(filter => {
      return filter.include && filter.type === 'filter';
    });
  }

  getIngredientsToExclude(filters: Filter[]): Filter[] {
    return filters.filter(filter => {
      return !filter.include && filter.type === 'filter';
    });
  }
}
