import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {FilterListComponent} from './list/filter-list.component';
import {FilterService} from '../../../../services/filter/filter.service';
import {NgClass} from '@angular/common';
import {myInput} from '../../../../primeng/input';
import {Drawer} from 'primeng/drawer';
import {PrimeTemplate} from 'primeng/api';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {TranslatePipe} from '@ngx-translate/core';
import {Tag} from 'primeng/tag';

export interface FilterItem {
  header: string;
  items: string[];
}

const FILTER_ANIMATION_TRANSITION_DURATION = "400ms";
const PILL_ANIMATION_TRANSITION_DURATION = "400ms";

@Component({
  selector: 'app-products-filter',
  imports: [
    NgClass,
    TranslatePipe,
    Tag,
    FilterListComponent,
    Drawer,
    PrimeTemplate
  ],
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('filtersAnimation', [
      transition(':enter', [style({
        height: "0px",
        overflow: "hidden"
      }), animate(FILTER_ANIMATION_TRANSITION_DURATION, style({height: "*"}))]),
      transition(':leave', [animate(FILTER_ANIMATION_TRANSITION_DURATION, style({height: '0px', overflow: "hidden"}))]),
    ]),
    trigger('pillsAnimation', [
      transition(':enter', [style({scale: 1}), animate(PILL_ANIMATION_TRANSITION_DURATION, keyframes([
        style({scale: 1}),
        style({scale: 1.1}),
        style({scale: 1.2}),
        style({scale: 1}),
      ]))]),
      transition(':leave', [style({scale: 1}), animate(PILL_ANIMATION_TRANSITION_DURATION, keyframes([
        style({scale: 1}),
        style({scale: 0.6}),
        style({scale: 0.4}),
        style({scale: 0}),
      ]))]),
    ])
  ]
})
export class ProductsFilterComponent {
  items = input.required<FilterItem[]>();
  drawerFiltersVisible = false;
  collapsed = true;
  protected filterService = inject(FilterService);
  protected filters = this.filterService.getFilters();
  protected readonly myInput = myInput;

  toggleFiltersDrawer() {
    this.drawerFiltersVisible = !this.drawerFiltersVisible;
  }

  toggle() {
    this.toggleCollapse();
    this.toggleFiltersDrawer();
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
}
