import {inject, Pipe, PipeTransform} from '@angular/core';
import {ProductDTO} from '../../../../interfaces/dto/resources';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
  name: 'productsSearch'
})
export class ProductsSearchPipe implements PipeTransform {
  private translateService = inject(TranslateService);

  transform(items: ProductDTO[], searchText: string, searchFilters: string[]): ProductDTO[] {
    if (!items) {
      return [];
    }

    if (!searchText) {

      if (searchFilters.length > 0) {
        return this.filterItems(searchFilters, items);
      } else {
        return items;
      }

    } else {

      if (searchFilters.length > 0) {
        return this.filterItems(searchFilters, this.search(searchText, items));
      } else {
        return this.search(searchText, items);
      }

    }
  }

  search(searchText: string, items: ProductDTO[]): ProductDTO[] {
    return items.filter(item => {
      return item.name.es.toLowerCase().includes(searchText);
    });
  }

  filterItems(searchFilters: string[], items: ProductDTO[]): ProductDTO[] {
    const locale = this.translateService.currentLang;
    const filteredItems: ProductDTO[] = [];
    const filters: string[] = searchFilters.map((filter) => {
      return this.translateService.instant(filter).toLowerCase();
    });

    filters.forEach((filter) => {

      items.map(item => {
        if (locale === 'en') {
          if (item.description.en.toLowerCase().includes(filter)) {
            filteredItems.push(item);
          }
        } else {
          if (item.description.es.toLowerCase().includes(filter)) {
            filteredItems.push(item);
          }
        }
      });
    });

    return filteredItems;
  }
}
