import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  searchFilters = signal<string[]>([]);
  isEmpty = signal(true);

  add(filter: string) {
    if (this.isEmpty()) {
      this.isEmpty.set(false);
    }

    this.searchFilters.update(currentFilters => {
      return [...currentFilters, filter];
    });
  }

  remove(filter: string) {
    const filters = this.searchFilters().filter(oldFilter => {
      return oldFilter !== filter;
    });

    this.searchFilters.set(filters);

    if (this.searchFilters().length === 0) {
      this.isEmpty.set(true);
    }
  }

  clear() {
    this.searchFilters.set([]);
    this.isEmpty.set(true);
  }

  getFilters() {
    return this.searchFilters.asReadonly();
  }

  getIsEmpty() {
    return this.isEmpty.asReadonly();
  }
}
