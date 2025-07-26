import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {FilterItemComponent} from '../item/filter-item.component';
import {TranslatePipe} from '@ngx-translate/core';
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
  readonly header = input.required<string>();
  readonly items = input.required<string[]>();
  readonly inverseCardBg = input.required<boolean>();
}
