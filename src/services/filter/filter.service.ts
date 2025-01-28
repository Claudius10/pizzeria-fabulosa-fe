import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  searchText = signal<string>("");
  ingredientFilters = signal<string[]>([]);
  allergenFilters = signal<string[]>([]);
  areIngredientFiltersEmpty = signal(true);
  areAllergenFiltersEmpty = signal(true);

  setSearchText(text: string) {
    this.searchText.set(text);
  }

  containsIngredient(category: string): boolean {
    let result = false;

    for (let filter of this.ingredientFilters()) {
      if (filter.includes(category)) {
        result = true;
        break;
      }
    }

    return result;
  }

  containsAllergen(allergen: string): boolean {
    let result = false;

    for (let filter of this.allergenFilters()) {
      if (filter.includes(allergen)) {
        result = true;
        break;
      }
    }

    return result;
  }

  addAllergenFilter(filter: string) {
    if (this.areAllergenFiltersEmpty()) {
      this.areAllergenFiltersEmpty.set(false);
    }

    this.allergenFilters.update(currentFilters => {
      return [...currentFilters, filter];
    });
  }

  removeAllergenFilter(filter: string) {
    const filters = this.allergenFilters().filter(oldFilter => {
      return oldFilter !== filter;
    });

    this.allergenFilters.set(filters);

    if (this.allergenFilters().length === 0) {
      this.areAllergenFiltersEmpty.set(true);
    }
  }

  addIngredientFilter(filter: string) {
    if (this.areIngredientFiltersEmpty()) {
      this.areIngredientFiltersEmpty.set(false);
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
      this.areIngredientFiltersEmpty.set(true);
    }
  }

  clear() {
    this.ingredientFilters.set([]);
    this.allergenFilters.set([]);
    this.areIngredientFiltersEmpty.set(true);
    this.areAllergenFiltersEmpty.set(true);
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

  getAreIngredientFiltersEmpty() {
    return this.areIngredientFiltersEmpty.asReadonly();
  }

  getAreAllergenFiltersEmpty() {
    return this.areAllergenFiltersEmpty.asReadonly();
  }
}
