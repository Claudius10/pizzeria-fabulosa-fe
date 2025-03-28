import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
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
export class FilterItemComponent {
  item = input.required<string>();
  private filterService = inject(FilterService);

  toggleFilter() {
    const type = this.isAllergen() ? "allergen" : "filter";
    this.filterService.toggleFilter(this.item(), type);
  };

  isAllergen() {
    return this.item().includes("allergen");
  }
}
