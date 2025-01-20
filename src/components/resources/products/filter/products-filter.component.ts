import {ChangeDetectionStrategy, Component, inject, input, signal} from '@angular/core';
import {InputText} from 'primeng/inputtext';

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

@Component({
  selector: 'app-products-filter',
  imports: [
    InputText,
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
      transition(':enter', [style({opacity: 0}), animate('500ms', style({opacity: 1}))]),
      transition(':leave', [animate('500ms', style({opacity: 0}))]),
    ]),
  ]
})
export class ProductsFilterComponent {
  items = input.required<FilterItem[]>();
  protected filterService = inject(FilterService);
  protected isEmpty = this.filterService.getIsEmpty();
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
