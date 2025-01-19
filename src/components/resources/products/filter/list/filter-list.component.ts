import {ChangeDetectionStrategy, Component, input, output, signal} from '@angular/core';
import {FilterItemComponent} from '../item/filter-item.component';
import {TranslatePipe} from '@ngx-translate/core';
import {Card} from 'primeng/card';
import {card} from '../../../../../primeng/card';

@Component({
  selector: 'app-filter-list',
  imports: [
    FilterItemComponent,
    TranslatePipe,
    Card
  ],
  templateUrl: './filter-list.component.html',
  styleUrl: './filter-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterListComponent {
  onFilterSelect = output<string>();
  header = input.required<string>();
  items = input.required<string[]>();
  open = signal(true);

  toggle() {
    this.open.set(!this.open());
  }

  protected readonly card = card;
}
