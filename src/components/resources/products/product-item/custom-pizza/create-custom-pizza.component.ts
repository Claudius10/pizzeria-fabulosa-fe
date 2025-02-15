import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SelectButton} from 'primeng/selectbutton';
import {Button} from 'primeng/button';
import {isFormValid} from '../../../../../utils/functions';
import {NgClass, NgOptimizedImage, UpperCasePipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {pairwise, startWith} from 'rxjs';

@Component({
  selector: 'app-create-custom-pizza',
  imports: [
    ReactiveFormsModule,
    SelectButton,
    Button,
    NgClass,
    TranslatePipe,
    NgOptimizedImage,
    UpperCasePipe
  ],
  templateUrl: './create-custom-pizza.component.html',
  styleUrl: './create-custom-pizza.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCustomPizzaComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  ingredientQuantity = signal<number>(3);
  price = signal<number>(11);
  allergens = signal<string[]>([
    "component.products.filters.allergen.gluten",
    "component.products.filters.allergen.lactose"
  ]);

  form = new FormGroup({
    format: new FormControl<string>("component.custom.pizza.format.m",
      {
        nonNullable: true,
        updateOn: "change",
        validators: [Validators.required]
      },
    ),
    sauce: new FormControl<string>("component.products.filters.sauce.tomato",
      {
        nonNullable: true,
        updateOn: "submit",
        validators: [Validators.required]
      },
    ),
    baseCheese: new FormControl<string>("component.products.filters.cheese.mozzarella",
      {
        nonNullable: true,
        updateOn: "change",
        validators: [Validators.required]
      },
    ),
    allergen: new FormControl<string>("",
      {
        nonNullable: true,
        updateOn: "change",
      },
    ),
    meat: new FormControl<string[]>([],
      {
        nonNullable: true,
        updateOn: "change",
      },
    ),
    cheese: new FormControl<string[]>([],
      {
        nonNullable: true,
        updateOn: "change",
      },
    ),
    vegetable: new FormControl<string[]>([],
      {
        nonNullable: true,
        updateOn: "change",
      },
    ),
    others: new FormControl<string[]>([],
      {
        nonNullable: true,
        updateOn: "change"
      },
    ),
  });

  ngOnInit(): void {
    const format = this.form.controls.format.valueChanges.subscribe({
      next: format => {
        if (format!.includes("format.m")) {
          this.price.update(prevPrice => prevPrice - 4);
        } else if (format!.includes("format.l")) {
          this.price.update(prevPrice => prevPrice + 4);
        }
      }
    });

    const baseCheese = this.form.controls.baseCheese.valueChanges.subscribe({
      next: baseCheese => {
        const cheese = this.form.controls.cheese;

        if (cheese.enabled) {

          // if Lactose free option was selected
          if (baseCheese === "component.custom.pizza.base.no.lactose") {
            cheese.reset();
            cheese.disable();
            this.removeAllergen("lactose");
            this.price.update(prevPrice => prevPrice + 2);
          }

          // if No base cheese was selected && if there are no other cheeses selected, remove lactose allergen
          if (baseCheese === "component.custom.pizza.base.no.cheese" && this.form.controls.cheese.value.length === 0) {
            this.removeAllergen("lactose");
          }

          // if an option other than Lactose free or No base cheese was selected, add lactose allergen
          if (baseCheese !== "component.custom.pizza.base.no.lactose" && baseCheese !== "component.custom.pizza.base.no.cheese") {
            this.addAllergen("lactose");
          }

        } else {
          cheese.enable();
          this.price.update(prevPrice => prevPrice - 2);
          // add lactose allergen when selecting a different option from Lactose free
          // if No base cheese was not the selected option
          if (baseCheese !== "component.custom.pizza.base.no.cheese") {
            this.addAllergen("lactose");
          }
        }
      }
    });

    const allergens = this.form.controls.allergen.valueChanges.subscribe({
      next: allergen => {
        if (allergen == null) {
          this.price.update(prevPrice => prevPrice - 2);
          this.addAllergen("gluten");
        } else {
          if (allergen.includes("no.gluten")) {
            this.price.update(prevPrice => prevPrice + 2);
            this.removeAllergen("gluten");
          }
        }
      }
    });

    const meat = this.form.controls.meat.valueChanges.pipe(startWith(undefined), pairwise()).subscribe({
      next: arrays => {
        this.updatePrice(arrays);
      }
    });

    const cheese = this.form.controls.cheese.valueChanges.pipe(startWith(undefined), pairwise()).subscribe({
      next: arrays => {
        this.updatePrice(arrays);
        this.updateLactoseAllergen(arrays);
      }
    });

    const vegetable = this.form.controls.vegetable.valueChanges.pipe(startWith(undefined), pairwise()).subscribe({
      next: arrays => {
        this.updatePrice(arrays);
      }
    });

    const others = this.form.controls.others.valueChanges.pipe(startWith(undefined), pairwise()).subscribe({
      next: arrays => {
        this.updatePrice(arrays);
      }
    });

    this.destroyRef.onDestroy(() => {
      format.unsubscribe();
      baseCheese.unsubscribe();
      allergens.unsubscribe();
      meat.unsubscribe();
      cheese.unsubscribe();
      vegetable.unsubscribe();
      others.unsubscribe();
    });
  }

  onSubmit() {
    if (isFormValid(this.form)) {
      console.log(this.form.value);
    }
  }

  updatePrice(arrays: [string[] | undefined, string[] | undefined]) {
    const old = arrays[0];
    const actual = arrays[1];

    if (old === undefined) {
      // first emission
      // have to check for actual not being empty in case "Lactose free" is selected with empty cheese array
      if (actual && actual.length > 0) {
        this.price.update(prevPrice => prevPrice + 1.50);
        this.ingredientQuantity.update(prevQ => prevQ + 1);
      }
    } else {
      // subsequent emissions
      if (actual) {
        // case when there are cheese items already selected and lactose free was selected
        // so to rest the price of the cheese items when they are removed
        if (actual.length === 0 && old.length > 0) {
          this.price.update(prevPrice => prevPrice - (1.50 * old.length));
          this.ingredientQuantity.update(prevQ => prevQ - (old.length));
          return;
        }

        if (actual.length > old.length) {
          this.price.update(prevPrice => prevPrice + 1.50);
          this.ingredientQuantity.update(prevQ => prevQ + 1);
          return;
        }

        if (actual.length < old.length) {
          this.price.update(prevPrice => prevPrice - 1.50);
          this.ingredientQuantity.update(prevQ => prevQ - 1);
          return;
        }
      }
    }
  }

  updateLactoseAllergen(arrays: [string[] | undefined, string[] | undefined]) {
    const old = arrays[0]!;
    const actual = arrays[1]!;

    if (old === undefined) {
      // first emission
      if (actual.length > 0) {
        this.addAllergen("lactose");
      }

    } else {
      // subsequent emissions
      if (actual.length === 0) {
        this.removeAllergen("lactose");
      }

      if (actual.length > 0) {
        this.addAllergen("lactose");
      }
    }
  }

  addAllergen(allergen: string) {
    const allergenFullName = this.getFullAllergenName(allergen);
    const index = this.allergens().findIndex(value => value === allergenFullName);
    if (index === -1) {
      this.allergens.update(value => [...value, allergenFullName]);
    }
  }

  removeAllergen(allergen: string) {
    const allergenFullName = this.getFullAllergenName(allergen);
    const allergens = this.allergens().filter(value => value !== allergenFullName);
    this.allergens.set(allergens);
  }

  reset() {
    this.form.reset();
    this.ingredientQuantity.set(3);
    this.price.set(11);
    this.allergens.set([
      "component.products.filters.allergen.gluten",
      "component.products.filters.allergen.lactose"
    ]);
  }

  getFullAllergenName(allergen: string) {
    switch (allergen) {
      case "gluten":
        return "component.products.filters.allergen.gluten";
      case "lactose":
        return "component.products.filters.allergen.lactose";
      default:
        return "";
    }
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
    },
    {
      label: "component.custom.pizza.base.no.lactose",
      value: "component.custom.pizza.base.no.lactose",
    }
  ];

  allergenOptions = [
    {
      label: "component.custom.pizza.base.no.gluten",
      value: "component.custom.pizza.base.no.gluten"
    },
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
