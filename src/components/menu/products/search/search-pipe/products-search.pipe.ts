import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Filter} from '../../../../../services/filter/filter.service';
import {Product} from '../../../../../api/public';

@Pipe({
  name: 'productsSearch'
})
export class ProductsSearchPipe implements PipeTransform {
  private translateService;

  constructor(translateService: TranslateService) {
    this.translateService = translateService;
  }

  transform(items: Product[], searchText: string, filters: Filter[]): Product[] {
    if (items === null || items.length === 0) {
      return [];
    }

    const locale = this.getLocale();
    const localeFilters = this.translateFilters(filters);
    const withIncludedAllergens = this.filterByIncludedAllergens(items, this.getAllergensToInclude(localeFilters), locale);
    const withExcludedAllergens = this.filterByExcludedAllergens(withIncludedAllergens, this.getAllergensToExclude(localeFilters), locale);
    const withIncludedIngredients = this.filterByIncludedIngredients(withExcludedAllergens, this.getIngredientsToInclude(localeFilters), locale);
    const withExcludedIngredients = this.filterByExcludedIngredients(withIncludedIngredients, this.getIngredientsToExclude(localeFilters), locale);
    return searchText ? this.search(searchText, withExcludedIngredients) : withExcludedIngredients;
  }

  private search(searchText: string, items: Product[]): Product[] {
    return items.filter(item => {
      return item.name['es'].toLowerCase().includes(searchText.toLowerCase());
    });
  }

  private filterByIncludedAllergens(items: Product[], toInclude: Filter[], locale: string): Product[] {
    if (toInclude.length === 0) {
      return items;
    }

    const filteredItems: Product[] = [];

    items.forEach(item => {
      let included = 0;

      if (locale === 'en') {
        item.allergens['en'].filter((allergen) => {

          const index = toInclude.findIndex(allergenToInclude => {
            return allergenToInclude.name === allergen;
          });

          if (index !== -1) {
            included++;
          }
        });
      } else {
        item.allergens['es'].filter((allergen) => {

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

  private filterByIncludedIngredients(items: Product[], toInclude: Filter[], locale: string): Product[] {
    if (toInclude.length === 0) {
      return items;
    }

    const filteredItems: Product[] = [];

    items.forEach(item => {
      let included = 0;

      if (locale === 'en') {
        item.description['en'].filter((ingredient) => {

          const index = toInclude.findIndex(ingredientToInclude => {
            return ingredientToInclude.name === ingredient;
          });

          if (index !== -1) {
            included++;
          }
        });
      } else {
        item.description['es'].filter((ingredient) => {

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

  private filterByExcludedAllergens(items: Product[], toExclude: Filter[], locale: string): Product[] {
    if (toExclude.length === 0) {
      return items;
    }

    const filteredItems: Product[] = [];

    items.forEach(item => {
      let includeItem = true;

      if (locale === 'en') {
        for (let i = 0; item.allergens['en'].length > i; i++) {
          let allergen = item.allergens['en'][i];

          const index = toExclude.findIndex(allergenToExclude => {
            return allergenToExclude.name === allergen;
          });

          if (index !== -1) {
            includeItem = false;
            break;
          }
        }
      } else {
        for (let i = 0; item.allergens['es'].length > i; i++) {
          let allergen = item.allergens['es'][i];

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

  private filterByExcludedIngredients(items: Product[], toExclude: Filter[], locale: string): Product[] {
    if (toExclude.length === 0) {
      return items;
    }

    const filteredItems: Product[] = [];

    items.forEach(item => {
      let includeItem = true;

      if (locale === 'en') {
        for (let i = 0; item.description['en'].length > i; i++) {
          let ingredient = item.description['en'][i];

          const index = toExclude.findIndex(ingredientToExclude => {
            return ingredientToExclude.name === ingredient;
          });

          if (index !== -1) {
            includeItem = false;
            break;
          }
        }
      } else {
        for (let i = 0; item.description['es'].length > i; i++) {
          let ingredient = item.description['es'][i];

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

  private getLocale() {
    return this.translateService.currentLang;
  }

  private getAllergensToInclude(filters: Filter[]): Filter[] {
    return filters.filter(filter => {
      return filter.include && filter.type === 'allergen';
    });
  }

  private getAllergensToExclude(filters: Filter[]): Filter[] {
    return filters.filter(filter => {
      return !filter.include && filter.type === 'allergen';
    });
  }

  private getIngredientsToInclude(filters: Filter[]): Filter[] {
    return filters.filter(filter => {
      return filter.include && filter.type === 'filter';
    });
  }

  private getIngredientsToExclude(filters: Filter[]): Filter[] {
    return filters.filter(filter => {
      return !filter.include && filter.type === 'filter';
    });
  }

  private translateFilters(filters: Filter[]): Filter[] {
    return filters.map(filter => {
      return {
        name: this.translateService.instant(filter.name),
        type: filter.type,
        include: filter.include,
      };
    });
  }
}
