import {ChangeDetectionStrategy, Component, inject, input, signal} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {FilterService} from '../../../../../services/filter/filter.service';

@Component({
  selector: 'app-filter-item',
  imports: [
    TranslatePipe
  ],
  templateUrl: './filter-item.component.html',
  styleUrl: './filter-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterItemComponent {
  item = input.required<string>();
  private filterService = inject(FilterService);
  selected = signal(false);

  toggleFilter() {
    if (this.selected()) {
      this.filterService.remove(this.item());
      this.selected.set(false);
    } else {
      this.filterService.add(this.item());
      this.selected.set(true);
    }
  };
}
