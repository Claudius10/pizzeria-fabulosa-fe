import {ChangeDetectionStrategy, Component, effect, inject, input, output, signal, untracked} from '@angular/core';
import {FilterItemComponent} from '../item/filter-item.component';
import {TranslatePipe} from '@ngx-translate/core';
import {Card} from 'primeng/card';
import {card} from '../../../../../primeng/card';
import {NgClass} from '@angular/common';
import {FilterService} from '../../../../../services/filter/filter.service';

@Component({
  selector: 'app-filter-list',
  imports: [
    FilterItemComponent,
    TranslatePipe,
    Card,
    NgClass
  ],
  templateUrl: './filter-list.component.html',
  styleUrl: './filter-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterListComponent {
  onFilterSelect = output<string>();
  private filterService = inject(FilterService);
  private isEmpty = this.filterService.getIsEmpty();
  header = input.required<string>();
  items = input.required<string[]>();
  open = signal(true);
  selected = signal(false);

  constructor() {
    effect(() => {
      if (this.isEmpty()) {
        untracked(() => {
          this.selected.set(false);
        });
      }
    });
  }

  setSelected() {
    if (this.isEmpty()) {
      this.selected.set(false);
    } else {
      this.selected.set(true);
    }
  }

  toggle() {
    this.open.set(!this.open());
  }

  protected readonly card = card;
}
