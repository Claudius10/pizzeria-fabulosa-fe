import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SelectButton} from 'primeng/selectbutton';
import {Button} from 'primeng/button';
import {isFormValid} from '../../../../../utils/functions';
import {NgClass} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {ToggleButton} from 'primeng/togglebutton';

@Component({
  selector: 'app-create-custom-pizza',
  imports: [
    ReactiveFormsModule,
    SelectButton,
    Button,
    NgClass,
    TranslatePipe,
    ToggleButton
  ],
  templateUrl: './create-custom-pizza.component.html',
  styleUrl: './create-custom-pizza.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCustomPizzaComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  price = signal<number>(0);
  allergens = signal<string[]>([]);

  form = new FormGroup({
    format: new FormControl<string>("",
      {
        nonNullable: true,
        updateOn: "submit",
        validators: [Validators.required]
      },
    ),
    sauce: new FormControl<string>("",
      {
        nonNullable: true,
        updateOn: "submit",
        validators: [Validators.required]
      },
    ),
    baseCheese: new FormControl<string>("",
      {
        nonNullable: true,
        updateOn: "change",
        validators: [Validators.required]
      },
    ),
    gluten: new FormControl<string>("",
      {
        nonNullable: false,
        updateOn: "change",
      },
    ),
    lactose: new FormControl<string>("",
      {
        nonNullable: false,
        updateOn: "change",
      },
    ),
    meat: new FormControl<string>("",
      {
        nonNullable: false,
        updateOn: "change",
      },
    ),
    cheese: new FormControl<string>("",
      {
        nonNullable: false,
        updateOn: "change",
      },
    ),
    vegetable: new FormControl<string>("",
      {
        nonNullable: false,
        updateOn: "submit",
      },
    ),
    others: new FormControl<string>("",
      {
        nonNullable: false,
        updateOn: "submit",
      },
    ),
  });

  ngOnInit(): void {
    const subscription = this.form.valueChanges.subscribe({
      next: value => {
        console.log(value);
        this.updatePrice(value);
        this.updateAllergens(value);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSubmit() {
    if (isFormValid(this.form)) {
      console.log(this.form.value);
    }
  }

  updatePrice(ingredient: Partial<{
    format: string
    sauce: string
    baseCheese: string
    gluten: string | null
    lactose: string | null
    meat: string | null
    cheese: string | null
    vegetable: string | null
    others: string | null
  }>) {

  }

  updateAllergens(ingredient: Partial<{
    format: string
    sauce: string
    baseCheese: string
    gluten: string | null
    lactose: string | null
    meat: string | null
    cheese: string | null
    vegetable: string | null
    others: string | null
  }>) {

  }

  formatOptions = [
    {
      label: "component.custom.pizza.format.m",
      value: "component.custom.pizza.format.m"
    },
    {
      label: "component.custom.pizza.format.l",
      value: "component.custom.pizza.format.l"
    }
  ];

  sauceOptions = [
    {
      label: "component.products.filters.sauce.tomato",
      value: "component.products.filters.sauce.tomato"
    },
    {
      label: "component.products.filters.sauce.cream",
      value: "component.products.filters.sauce.cream"
    },
    {
      label: "component.custom.pizza.base.no.sauce",
      value: "component.custom.pizza.base.no.sauce"
    }
  ];

  baseCheeseOptions = [
    {
      label: "component.products.filters.cheese.mozzarella",
      value: "component.products.filters.cheese.mozzarella"
    },
    {
      label: "component.products.filters.cheese.double.mozzarella",
      value: "component.products.filters.cheese.double.mozzarella"
    },
    {
      label: "component.custom.pizza.base.no.cheese",
      value: "component.custom.pizza.base.no.cheese",
    }
  ];

  meatOptions = [
    {
      label: "component.products.filters.meat.bacon",
      value: "component.products.filters.meat.bacon"
    },
    {
      label: "component.products.filters.meat.double.bacon",
      value: "component.products.filters.meat.double.bacon"
    },
    {
      label: "component.products.filters.meat.pepperoni",
      value: "component.products.filters.meat.pepperoni"
    },
    {
      label: "component.products.filters.meat.double.pepperoni",
      value: "component.products.filters.meat.double.pepperoni"
    },
    {
      label: "component.products.filters.meat.beef",
      value: "component.products.filters.meat.beef"
    },
    {
      label: "component.products.filters.meat.york.ham",
      value: "component.products.filters.meat.york.ham"
    },
    {
      label: "component.products.filters.meat.chicken",
      value: "component.products.filters.meat.chicken"
    },
  ];

  cheeseOptions = [
    {
      label: "component.products.filters.cheese.parmesan",
      value: "component.products.filters.cheese.parmesan"
    },
    {
      label: "component.products.filters.cheese.emmental",
      value: "component.products.filters.cheese.emmental"
    },
    {
      label: "component.products.filters.cheese.goat",
      value: "component.products.filters.cheese.goat"
    },
    {
      label: "component.products.filters.cheese.blue",
      value: "component.products.filters.cheese.blue"
    },
  ];

  vegetableOptions = [
    {
      label: "component.products.filters.vegetables.zucchini",
      value: "component.products.filters.vegetables.zucchini"
    },
    {
      label: "component.products.filters.vegetables.tomato",
      value: "component.products.filters.vegetables.tomato"
    },
    {
      label: "component.products.filters.vegetables.onion",
      value: "component.products.filters.vegetables.onion"
    },
    {
      label: "component.products.filters.vegetables.mushroom",
      value: "component.products.filters.vegetables.mushroom"
    },
    {
      label: "component.products.filters.vegetables.eggplant",
      value: "component.products.filters.vegetables.eggplant"
    },
    {
      label: "component.products.filters.vegetables.olives.black",
      value: "component.products.filters.vegetables.olives.black"
    },
  ];

  otherOptions = [
    {
      label: "component.products.filters.oil.truffle",
      value: "component.products.filters.oil.truffle"
    },
  ];
}

function getPizzaAllergenItems() {
  return [
    'component.products.filters.allergen.gluten',
    'component.products.filters.allergen.lactose',
    'component.products.filters.allergen.soy',
    'component.products.filters.allergen.eggs',
    'component.products.filters.allergen.mustard',
  ];
}
