import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  searchFilters = signal<string[]>([]);

  add(filter: string) {
    console.log(filter);
    this.searchFilters.update(currentFilters => {
      return [...currentFilters, filter];
    });
    console.log(this.searchFilters());
  }

  remove(filter: string) {
    console.log(filter);
    const filters = this.searchFilters().filter(oldFilter => {
      return oldFilter !== filter;
    });
    this.searchFilters.set(filters);
    console.log(this.searchFilters());
  }

  clear() {
    this.searchFilters.set([]);
  }

  getFilters() {
    return this.searchFilters.asReadonly();
  }
}
