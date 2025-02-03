import {ChangeDetectionStrategy, Component, effect, inject, input, OnInit, signal, untracked} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
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
  private translateService = inject(TranslateService);
  item = input.required<string>();
  private filterService = inject(FilterService);
  private filters = this.filterService.getFilters();
  private areFiltersEmpty = this.filterService.getAreFiltersEmpty();
  selected = signal(false);
  included = signal(false);

  // when pressing filled filter icon, the filters are cleared
  // therefore remove the filter item active color
  constructor() {
    effect(() => {
      if (this.areFiltersEmpty()) {
        untracked(() => {
          this.selected.set(false);
        });
      }
    });
  }

  ngOnInit(): void {
    const previouslySelected = this.filters().findIndex(filter => filter.name === this.item());
    if (previouslySelected !== -1) {
      this.selected.set(true);
    }
  }

  toggleFilter() {
    const type = this.isAllergen() ? "allergen" : "filter";
    const filterName = this.translateService.instant(this.item());
    const filter = this.filterService.toggleFilter(filterName, type);

    if (filter === null) {
      this.selected.set(false);
      this.included.set(false);
    } else if (filter.include) {
      this.selected.set(true);
      this.included.set(true);
    } else {
      this.included.set(false);
    }
  };

  isAllergen() {
    return this.item().includes("allergen");
  }
}
