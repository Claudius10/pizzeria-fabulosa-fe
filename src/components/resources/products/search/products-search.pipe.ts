import {inject, Pipe, PipeTransform} from '@angular/core';
import {ProductDTO} from '../../../../interfaces/dto/resources';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
  name: 'productsSearch'
})
export class ProductsSearchPipe implements PipeTransform {
  private translateService = inject(TranslateService);

  transform(items: ProductDTO[], searchText: string, ingredientFilters: string[], allergenFilters: string[]): ProductDTO[] {
    if (items.length === 0) {
      return [];
    }

    const productsByAllergens = this.filterItemsByAllergens(
      this.getLocale(),
      this.getTranslatedAllergens(allergenFilters),
      items
    );

    const productsByAllergensAndIngredients = this.filterItemsByIngredients(
      this.getLocale(),
      this.getTranslatedIngredients(ingredientFilters),
      productsByAllergens
    );

    return searchText ? this.search(searchText, productsByAllergensAndIngredients) : productsByAllergensAndIngredients;
  }

  search(searchText: string, items: ProductDTO[]): ProductDTO[] {
    return items.filter(item => {
      return item.name.es.toLowerCase().includes(searchText);
    });
  }

  filterItemsByAllergens(locale: string, allergens: string[], items: ProductDTO[]): ProductDTO[] {
    if (allergens.length === 0) {
      return items;
    }

    const filteredItems: ProductDTO[] = [];

    items.forEach(item => {
      let add = true;

      if (locale === 'en') {
        item.allergens.en.forEach(allergen => {
          allergens.forEach(unwantedAllergen => {
            if (allergen === unwantedAllergen) {
              add = false;
            }
          });
        });

        if (add) {
          filteredItems.push(item);
        }

      } else {
        item.allergens.es.forEach(allergen => {
          allergens.forEach(unwantedAllergen => {
            if (allergen === unwantedAllergen) {
              add = false;
            }
          });
        });

        if (add) {
          filteredItems.push(item);
        }
      }
    });

    return filteredItems;
  }

  filterItemsByIngredients(locale: string, ingredients: string[], items: ProductDTO[]): ProductDTO[] {
    if (ingredients.length === 0) {
      return items;
    }

    const filteredItems: ProductDTO[] = [];
    items.forEach(item => {
      if (locale === 'en') {
        const included = item.description.en.filter((ingredient) => {
          return ingredients.includes(ingredient.toLowerCase());
        });

        if (included.length === ingredients.length) {
          filteredItems.push(item);
        }
      } else {
        const included = item.description.es.filter((ingredient) => {
          return ingredients.includes(ingredient.toLowerCase());
        });

        if (included.length === ingredients.length) {
          filteredItems.push(item);
        }
      }
    });

    return filteredItems;
  }

  getLocale() {
    return this.translateService.currentLang;
  }

  getTranslatedAllergens(filters: string []) {
    return filters.map((filter) => {
      return this.translateService.instant(filter);
    });
  }

  getTranslatedIngredients(filters: string []) {
    return filters.map((filter) => {
      return this.translateService.instant(filter).toLowerCase();
    });
  }
}
