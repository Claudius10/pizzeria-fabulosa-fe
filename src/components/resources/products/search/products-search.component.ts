import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {TranslatePipe} from '@ngx-translate/core';
import {myInput} from '../../../../primeng/input';
import {myIcon} from '../../../../primeng/icon';

@Component({
  selector: 'app-products-search',
  imports: [
    IconField,
    InputIcon,
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './products-search.component.html',
  styleUrl: './products-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsSearchComponent implements OnInit {
  onSearch = output<string>();
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    searchText: new FormControl<string>("", {
      nonNullable: true,
      updateOn: "change",
    })
  });

  ngOnInit(): void {
    const subscription = this.form.get('searchText')!.valueChanges.subscribe({
      next: value => {
        this.onSearch.emit(value);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  protected readonly myInput = myInput;
  protected readonly myIcon = myIcon;
}
