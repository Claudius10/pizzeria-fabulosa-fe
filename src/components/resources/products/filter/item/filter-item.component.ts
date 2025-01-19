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
  onSelected = output<boolean>();
  item = input.required<string>();
  private filterService = inject(FilterService);
  private filters = this.filterService.getFilters();
  protected isEmpty = this.filterService.getIsEmpty();
  selected = signal(false);

  // when pressing filled filter icon, the filters are cleared
  // therefore remove the filter item active color
  constructor() {
    effect(() => {
      if (this.isEmpty()) {
        untracked(() => {
          this.selected.set(false);
          this.filterService.removeFilter(this.item());
        });
      }
    });
  }

  ngOnInit(): void {
    const previouslySelected = this.filters().findIndex(filter => filter === this.item());
    if (previouslySelected !== -1) {
      this.selected.set(true);
    }
  }

  toggleFilter() {
    if (this.selected()) {
      this.filterService.removeFilter(this.item());
      this.selected.set(false);
      this.onSelected.emit(false);
    } else {
      this.filterService.addFilter(this.item());
      this.selected.set(true);
      this.onSelected.emit(true);
    }
  };
}
