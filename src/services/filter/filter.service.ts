import {Injectable, signal} from '@angular/core';

export interface Filter {
  type: string;
  name: string;
  include: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  searchText = signal<string>("");
  filters = signal<Filter[]>([]);
  //allergenFilters = signal<Filter[]>([]);
  areFiltersEmpty = signal(true);

  // areAllergenFiltersEmpty = signal(true);

  setSearchText(text: string) {
    this.searchText.set(text);
  }

  containsFilter(name: string): number {
    let index = -1;

    for (let i = 0; this.filters().length; i++) {
      const filter = this.filters()[i];
      if (filter.name === name) {
        index = i;
        break;
      }
    }

    return index;
  }

  toggleFilter(filter: string, type: string) {
    if (this.areFiltersEmpty()) {
      this.areFiltersEmpty.set(false);
    }

    const index = this.containsFilter(filter);
    console.log("index", index);
    if (index !== -1) {
      const foundFilter = this.filters()[index];
      if (foundFilter.include) {
        this.removeFilter(foundFilter.name);
        this.addFilter(foundFilter.name, false, foundFilter.type);
      } else {
        this.removeFilter(filter);
      }
    } else {
      this.addFilter(filter, true, type);
    }
  }

  addFilter(name: string, include: boolean, type: string): void {
    this.filters.update(currentFilters => {
      return [...currentFilters, {name: name, include: include, type: type}];
    });
  }

  removeFilter(name: string) {
    const filters = this.filters().filter(oldFilter => {
      return oldFilter.name !== name;
    });

    this.filters.set(filters);

    if (this.filters().length === 0) {
      this.areFiltersEmpty.set(true);
    }
  }

  // addDescriptionFilter(filter: Filter) {
  //   if (this.areDescriptionFiltersEmpty()) {
  //     this.areDescriptionFiltersEmpty.set(false);
  //   }
  //
  //   this.descriptionFilters.update(currentFilters => {
  //     return [...currentFilters, filter];
  //   });
  // }
  //
  // removeDescriptionFilter(filter: Filter) {
  //   const filters = this.descriptionFilters().filter(oldFilter => {
  //     return oldFilter.name !== filter.name;
  //   });
  //
  //   this.descriptionFilters.set(filters);
  //
  //   if (this.descriptionFilters().length === 0) {
  //     this.areDescriptionFiltersEmpty.set(true);
  //   }
  // }

  clear() {
    this.filters.set([]);
    // this.allergenFilters.set([]);
    this.areFiltersEmpty.set(true);
    // this.areAllergenFiltersEmpty.set(true);
  }

  getFilters() {
    return this.filters.asReadonly();
  }

  // getAllergenFilters() {
  //   return this.allergenFilters.asReadonly();
  // }

  getSearchText() {
    return this.searchText.asReadonly();
  }

  getAreFiltersEmpty() {
    return this.areFiltersEmpty.asReadonly();
  }

  // getAreAllergenFiltersEmpty() {
  //   return this.areAllergenFiltersEmpty.asReadonly();
  // }
}
