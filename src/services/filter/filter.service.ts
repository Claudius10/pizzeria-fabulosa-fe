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
  filters = signal<Filter[]>([]);
  areFiltersEmpty = signal(true);
  searchText = signal("");

  setSearchText(text: string) {
    this.searchText.set(text);
  }

  toggleFilter(filterName: string, type: string): Filter | null {
    const index = this.containsFilter(filterName);

    // filter added for the first time as an included filter
    if (index === -1) {
      return this.addFilter({name: filterName, type: type, include: true});
    }

    const existingFilter = this.filters()[index];

    if (existingFilter.include) {
      // if it's already in as an included filter, then re-add it as an excluded filter
      this.removeFilter(existingFilter);
      existingFilter.include = false;
      return this.addFilter(existingFilter);
    } else {
      // if it's already in as an excluded filter, remove it
      return this.removeFilter(existingFilter);
    }
  }

  clear() {
    this.filters.set([]);
    this.areFiltersEmpty.set(true);
    this.searchText.set("");
  }

  getFilters() {
    return this.filters.asReadonly();
  }

  private containsFilter(name: string): number {
    let index = -1;

    for (let i = 0; this.filters().length > i; i++) {
      if (this.filters()[i].name === name) {
        index = i;
        break;
      }
    }

    return index;
  }

  private addFilter(filter: Filter): Filter {
    this.filters.update(currentFilters => {
      return [...currentFilters, filter];
    });

    if (this.filters().length > 0) {
      this.areFiltersEmpty.set(false);
    }

    return filter;
  }

  private removeFilter(filter: Filter): null {
    const filters = this.filters().filter(oldFilter => {
      return oldFilter.name !== filter.name;
    });

    this.filters.set(filters);

    if (this.filters().length === 0) {
      this.areFiltersEmpty.set(true);
    }

    return null;
  }
}
