import {ChangeDetectionStrategy, Component} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {TranslatePipe} from '@ngx-translate/core';
import {input} from '../../../../primeng/input';

@Component({
  selector: 'app-products-filter',
  imports: [
    InputText,
    TranslatePipe
  ],
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsFilterComponent {


  toggleFilters() {

  }


  protected readonly input = input;
}
