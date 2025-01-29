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

    console.log("filters", filters);

    const allergenFilters = filters.filter(filter => {
      return filter.type === 'allergen';
    });

    const descriptionFilters = filters.filter(filter => {
      return filter.type === 'filter';
    });

    console.log("allergenFilters", allergenFilters);
    console.log("descriptionFilters", descriptionFilters);

    const productsByAllergens = this.filterItemsByAllergens(
      this.getLocale(),
      allergenFilters,
      items
    );

    const productsByAllergensAndDescription = this.filterItemsByDescription(
      this.getLocale(),
      descriptionFilters,
      productsByAllergens
    );

    return searchText ? this.search(searchText, productsByAllergensAndDescription) : productsByAllergensAndDescription;
  }

  search(searchText: string, items: ProductDTO[]): ProductDTO[] {
    return items.filter(item => {
      return item.name.es.toLowerCase().includes(searchText);
    });
  }

  filterItemsByAllergens(locale: string, allergens: Filter[], items: ProductDTO[]): ProductDTO[] {
    const filteredItems: ProductDTO[] = [];

    for (let i = 0; i < items.length; i++) {
      let item = items[i];

      if (!item.allergens) {
        continue;
      }

      let add = true;

      if (locale === 'en') {
        item.allergens.en.forEach(allergen => {
          allergens.forEach(unwantedAllergen => {
            if (allergen === unwantedAllergen.name && unwantedAllergen.include) {
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
            if (allergen === unwantedAllergen.name && unwantedAllergen.include) {
              add = false;
            }
          });
        });

        if (add) {
          filteredItems.push(item);
        }
      }
    }

    return filteredItems;
  }

  filterItemsByDescription(locale: string, filters: Filter[], items: ProductDTO[]): ProductDTO[] {
    const filteredItems: ProductDTO[] = [];

    items.forEach(item => {

      if (locale === 'en') {

        let included = 0;

        item.description.en.filter((descriptionItem) => {
          filters.forEach((filterItem) => {
            if (filterItem.name === descriptionItem && filterItem.include) {
              included++;
            }
          });
        });

        if (included === filters.length) {
          filteredItems.push(item);
        }

      } else {
        // const included = item.description.es.filter((descriptionItem) => {
        //   return description.includes(descriptionItem.toLowerCase());
        // });
        //
        // if (included.length === description.length) {
        //   filteredItems.push(item);
        // }
      }
    });

    return filteredItems;
  }

  getLocale() {
    return this.translateService.currentLang;
  }
}
