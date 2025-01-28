import {ChangeDetectionStrategy, Component, effect, inject, input, output, signal, untracked} from '@angular/core';
import {FilterItemComponent} from '../item/filter-item.component';
import {TranslatePipe} from '@ngx-translate/core';
import {card} from '../../../../../primeng/card';
import {NgClass} from '@angular/common';
import {FilterService} from '../../../../../services/filter/filter.service';

@Component({
  selector: 'app-filter-list',
  imports: [
    FilterItemComponent,
    TranslatePipe,
    NgClass
  ],
  templateUrl: './filter-list.component.html',
  styleUrl: './filter-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterListComponent {
  onFilterSelect = output<string>();
  private filterService = inject(FilterService);
  private areIngredientFiltersEmpty = this.filterService.getAreIngredientFiltersEmpty();
  private areAllergenFiltersEmpty = this.filterService.getAreAllergenFiltersEmpty();
  header = input.required<string>();
  items = input.required<string[]>();
  inverseCardBg = input.required<boolean>();
  selected = signal(false);

  // when pressing filled filter icon, the filters are cleared
  // therefore remove the filter header active color
  constructor() {
    effect(() => {
      if (this.isAllergen()) {
        if (this.areAllergenFiltersEmpty()) {
          untracked(() => {
            this.selected.set(false);
          });
        }
      } else {
        if (this.areIngredientFiltersEmpty()) {
          untracked(() => {
            this.selected.set(false);
          });
        }
      }
    });
  }

  setSelected() {
    if (this.isAllergen()) {
      if (!this.filterService.containsAllergen(this.header())) {
        this.selected.set(false);
      } else {
        this.selected.set(true);
      }
    } else {
      if (!this.filterService.containsIngredient(this.header())) {
        this.selected.set(false);
      } else {
        this.selected.set(true);
      }
    }
  }

  isAllergen() {
    return this.header().includes("allergen");
  }

  protected readonly card = card;
}
