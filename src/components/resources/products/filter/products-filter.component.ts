import {ChangeDetectionStrategy, Component, inject, input, signal} from '@angular/core';

import {FilterListComponent} from './list/filter-list.component';
import {FilterService} from '../../../../services/filter/filter.service';
import {NgClass} from '@angular/common';
import {myInput} from '../../../../primeng/input';
import {Drawer} from 'primeng/drawer';
import {PrimeTemplate} from 'primeng/api';
import {animate, style, transition, trigger} from '@angular/animations';
import {TranslatePipe} from '@ngx-translate/core';

export interface FilterItem {
  header: string;
  items: string[];
}

const FILTER_ANIMATION_TRANSITION_DURATION = "600ms";

@Component({
  selector: 'app-products-filter',
  imports: [
    NgClass,
    FilterListComponent,
    Drawer,
    PrimeTemplate,
    TranslatePipe
  ],
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('filtersAnimation', [
      transition(':enter', [style({
        height: "0",
        overflow: "hidden"
      }), animate(FILTER_ANIMATION_TRANSITION_DURATION, style({height: "*"}))]),
      transition(':leave', [animate(FILTER_ANIMATION_TRANSITION_DURATION, style({height: 0, overflow: "hidden"}))]),
    ]),
  ]
})
export class ProductsFilterComponent {
  items = input.required<FilterItem[]>();
  protected filterService = inject(FilterService);
  protected areIngredientFiltersEmpty = this.filterService.getAreIngredientFiltersEmpty();
  protected areAllergenFiltersEmpty = this.filterService.getAreAllergenFiltersEmpty();
  open = signal(false);
  drawerFiltersVisible = false;
  collapsed = true;

  toggleFiltersDrawer() {
    this.drawerFiltersVisible = !this.drawerFiltersVisible;
  }

  toggle() {
    this.toggleCollapse();
    if (window.innerWidth <= 929) {
      this.toggleFiltersDrawer();
      this.open.set(false);
    } else {
      this.open.set(!this.open());
      this.filterService.clear();
    }
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  protected readonly myInput = myInput;
}
