import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
  untracked
} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {FilterService} from '../../../../../services/filter/filter.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-filter-item',
  imports: [
    TranslatePipe,
    NgClass
  ],
  templateUrl: './filter-item.component.html',
  styleUrl: './filter-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterItemComponent implements OnInit {
  onSelected = output<string>();
  item = input.required<string>();
  private filterService = inject(FilterService);
  private ingredientFilters = this.filterService.getIngredientFilters();
  private isEmpty = this.filterService.getIsEmpty();
  selected = signal(false);

  // when pressing filled filter icon, the filters are cleared
  // therefore remove the filter item active color
  constructor() {
    effect(() => {
      if (this.isEmpty() && !this.isAllergen()) {
        untracked(() => {
          this.selected.set(false);
          this.filterService.removeIngredientFilter(this.item());
        });
      }
    });
  }

  ngOnInit(): void {
    const previouslySelected = this.ingredientFilters().findIndex(filter => filter === this.item());
    if (previouslySelected !== -1) {
      this.selected.set(true);
    }
  }

  toggleFilter() {
    if (this.isAllergen()) {
      if (this.selected()) {
        this.selected.set(false);
        this.filterService.removeAllergenFilter(this.item());
      } else {
        this.selected.set(true);
        this.filterService.addAllergenFilter(this.item());
      }
    } else {
      if (this.selected()) {
        this.filterService.removeIngredientFilter(this.item());
        this.selected.set(false);
      } else {
        this.filterService.addIngredientFilter(this.item());
        this.selected.set(true);
      }
    }
    this.onSelected.emit(this.item());
  };

  isAllergen() {
    return this.item().includes("allergen");
  }
}
