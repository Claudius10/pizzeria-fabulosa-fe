import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  selectedFilters = signal<string[]>([]);
  isEmpty = signal(true);

  contains(category: string): boolean {
    let result = false;

    for (let filter of this.selectedFilters()) {
      if (filter.includes(category)) {
        result = true;
        break;
      }
    }

    return result;
  }

  addFilter(filter: string) {
    if (this.isEmpty()) {
      this.isEmpty.set(false);
    }

    this.selectedFilters.update(currentFilters => {
      return [...currentFilters, filter];
    });
  }

  removeFilter(filter: string) {
    const filters = this.selectedFilters().filter(oldFilter => {
      return oldFilter !== filter;
    });

    this.selectedFilters.set(filters);

    if (this.selectedFilters().length === 0) {
      this.isEmpty.set(true);
    }
  }

  clear() {
    this.selectedFilters.set([]);
    this.isEmpty.set(true);
  }

  getFilters() {
    return this.selectedFilters.asReadonly();
  }

  getIsEmpty() {
    return this.isEmpty.asReadonly();
  }
}
