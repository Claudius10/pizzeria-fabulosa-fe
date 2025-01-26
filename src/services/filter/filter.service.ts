import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  searchText = signal<string>("");
  ingredientFilters = signal<string[]>([]);
  allergenFilters = signal<string[]>([]);
  isEmpty = signal(true);

  setSearchText(text: string) {
    this.searchText.set(text);
  }

  contains(category: string): boolean {
    let result = false;

    for (let filter of this.ingredientFilters()) {
      if (filter.includes(category)) {
        result = true;
        break;
      }
    }

    return result;
  }

  addAllergenFilter(filter: string) {


    this.allergenFilters.update(currentFilters => {
      return [...currentFilters, filter];
    });


  }

  removeAllergenFilter(filter: string) {
    const filters = this.allergenFilters().filter(oldFilter => {
      return oldFilter !== filter;
    });

    this.allergenFilters.set(filters);

  }

  addIngredientFilter(filter: string) {
    if (this.isEmpty()) {
      this.isEmpty.set(false);
    }

    this.ingredientFilters.update(currentFilters => {
      return [...currentFilters, filter];
    });
  }

  removeIngredientFilter(filter: string) {
    const filters = this.ingredientFilters().filter(oldFilter => {
      return oldFilter !== filter;
    });

    this.ingredientFilters.set(filters);

    if (this.ingredientFilters().length === 0) {
      this.isEmpty.set(true);
    }
  }

  clear() {
    this.ingredientFilters.set([]);
    this.isEmpty.set(true);
  }

  getIngredientFilters() {
    return this.ingredientFilters.asReadonly();
  }

  getAllergenFilters() {
    return this.allergenFilters.asReadonly();
  }

  getSearchText() {
    return this.searchText.asReadonly();
  }

  getIsEmpty() {
    return this.isEmpty.asReadonly();
  }
}
