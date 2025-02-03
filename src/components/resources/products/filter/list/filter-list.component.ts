import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {FilterItemComponent} from '../item/filter-item.component';
import {TranslatePipe} from '@ngx-translate/core';
import {card} from '../../../../../primeng/card';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-filter-list',
  imports: [
    FilterItemComponent,
    NgClass,
    TranslatePipe
  ],
  templateUrl: './filter-list.component.html',
  styleUrl: './filter-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterListComponent {
  header = input.required<string>();
  items = input.required<string[]>();
  inverseCardBg = input.required<boolean>();

  protected readonly card = card;
}
