import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Card} from 'primeng/card';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SelectButton} from 'primeng/selectbutton';
import en from '../../../../../../public/i18n/en.json';
import {Button} from 'primeng/button';
import {isFormValid} from '../../../../../utils/functions';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-create-custom-pizza',
  imports: [
    Card,
    ReactiveFormsModule,
    SelectButton,
    Button,
    NgClass
  ],
  templateUrl: './create-custom-pizza.component.html',
  styleUrl: './create-custom-pizza.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCustomPizzaComponent {

  form = new FormGroup({
    format: new FormControl<string>("",
      {
        nonNullable: true,
        updateOn: "change",
        validators: [Validators.required]
      },
    ),
    sauce: new FormControl<string>("",
      {
        nonNullable: true,
        updateOn: "change",
        validators: [Validators.required]
      },
    ),
    cheese: new FormControl<string>("",
      {
        nonNullable: false,
        updateOn: "change",
        validators: [Validators.required]
      },
    ),
  });

  formatOptions = [
    {
      label: en["component.products.filters.cheese.mozzarella"],
      value: en["component.products.filters.cheese.mozzarella"]
    },
    {
      label: en["component.products.filters.cheese.double.mozzarella"],
      value: en["component.products.filters.cheese.double.mozzarella"]
    }
  ];

  sauceOptions = [
    {
      label: en["component.products.filters.cheese.mozzarella"],
      value: en["component.products.filters.cheese.mozzarella"]
    },
    {
      label: en["component.products.filters.cheese.double.mozzarella"],
      value: en["component.products.filters.cheese.double.mozzarella"]
    }
  ];

  cheeseOptions = [
    {
      label: en["component.products.filters.cheese.mozzarella"],
      value: en["component.products.filters.cheese.mozzarella"]
    },
    {
      label: en["component.products.filters.cheese.double.mozzarella"],
      value: en["component.products.filters.cheese.double.mozzarella"]
    },
    {
      label: "Sin queso base",
      value: "Sin queso base",
    }
  ];

  onSubmit() {
    if (isFormValid(this.form)) {
      console.log(this.form.value);
    }
  }
}
