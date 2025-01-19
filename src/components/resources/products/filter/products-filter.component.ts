import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {TranslatePipe} from '@ngx-translate/core';
import {input} from '../../../../primeng/input';
import {FilterListComponent} from './list/filter-list.component';
import {FilterService} from '../../../../services/filter/filter.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-products-filter',
  imports: [
    InputText,
    TranslatePipe,
    FilterListComponent,
    NgClass
  ],
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsFilterComponent {
  protected filterService = inject(FilterService);
  protected isEmpty = this.filterService.getIsEmpty();
  open = signal(false);

  toggle() {
    this.open.set(!this.open());
    this.filterService.clear();
  }

  meatItems = [
    'component.products.filters.meat.bacon',
    'component.products.filters.meat.double.bacon',
    'component.products.filters.meat.pepperoni',
    'component.products.filters.meat.double.pepperoni',
    'component.products.filters.meat.beef',
    'component.products.filters.meat.york.ham',
    'component.products.filters.meat.chicken'
  ];

  cheeseItems = [
    'component.products.filters.cheese.parmesan',
    'component.products.filters.cheese.emmental',
    'component.products.filters.cheese.blue',
    'component.products.filters.cheese.goat',
    'component.products.filters.cheese.mozzarella',
    'component.products.filters.cheese.double.mozzarella',
  ];

  vegetablesItems = [
    'component.products.filters.vegetables.zucchini',
    'component.products.filters.vegetables.tomato',
    'component.products.filters.vegetables.onion',
    'component.products.filters.vegetables.mushroom',
    'component.products.filters.vegetables.eggplant',
    'component.products.filters.vegetables.olives.black',
  ];

  sauceItems = [
    'component.products.filters.sauce.tomato',
    'component.products.filters.sauce.cream',
  ];

  othersItems = [
    'component.products.filters.others.truffle.oil',
  ];

  protected readonly input = input;
}
