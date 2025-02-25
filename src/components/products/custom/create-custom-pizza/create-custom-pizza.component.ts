import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {isFormValid} from '../../../../utils/functions';
import {pairwise, startWith} from 'rxjs';
import {SelectButton} from 'primeng/selectbutton';
import {TranslatePipe} from '@ngx-translate/core';
import {NgClass, UpperCasePipe} from '@angular/common';
import {Button} from 'primeng/button';

export interface CustomPizza {
  ingredients: string[];
  price: number;
  format: string;
}

@Component({
  selector: 'app-create-custom-pizza',
  imports: [
    ReactiveFormsModule,
    SelectButton,
    TranslatePipe,
    NgClass,
    Button,
    UpperCasePipe
  ],
  templateUrl: './create-custom-pizza.component.html',
  styleUrl: './create-custom-pizza.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCustomPizzaComponent implements OnInit {
  onNewCustomPizza = output<CustomPizza>();
  private destroyRef = inject(DestroyRef);
  allergens = signal<string[]>([
    "component.products.filters.allergen.gluten",
    "component.products.filters.allergen.lactose"
  ]);
  ingredientQuantity = signal<number>(3);
  price = signal<number>(11);

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
        updateOn: "change",
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
    allergens: new FormControl<string[]>([],
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
        this.form.controls.allergens.reset();
        this.form.controls.sauce.reset();
        this.form.controls.baseCheese.reset();
        this.form.controls.meat.reset();
        this.form.controls.cheese.reset();
        this.form.controls.vegetable.reset();
        this.form.controls.others.reset();

        if (format.includes("format.m")) {
          this.price.set(11);
        } else if (format.includes("format.l")) {
          this.price.set(15);
        }
      }
    });

    const sauce = this.form.controls.sauce.valueChanges.subscribe({
      next: sauce => {
        if (sauce.includes("sauce.cream") && !this.isLactoseFree()) {
          this.addAllergen("lactose");
        } else {
          if (this.form.controls.baseCheese.value === "component.custom.pizza.base.no.cheese") {
            this.removeAllergen("lactose");
          }
        }
      }
    });

    const baseCheese = this.form.controls.baseCheese.valueChanges.subscribe({
      next: baseCheese => {
        // if No base cheese was selected && if there are no other cheeses selected, remove lactose allergen
        if (baseCheese === "component.custom.pizza.base.no.cheese" &&
          this.form.controls.cheese.value.length === 0 &&
          this.form.controls.sauce.value === 'component.custom.pizza.base.no.sauce') {
          this.removeAllergen("lactose");
        }

        // if an option other than No base cheese was selected, add lactose allergen
        if (baseCheese !== "component.custom.pizza.base.no.cheese" && !this.isLactoseFree()) {
          this.addAllergen("lactose");
        }
      }
    });

    const allergens = this.form.controls.allergens.valueChanges.pipe(startWith(undefined), pairwise()).subscribe({
      next: arrays => {
        const old = arrays[0];
        const actual = arrays[1]!;
        const cheese = this.form.controls.cheese;

        if (this.isLactoseFree()) {
          this.removeAllergen("lactose");
          cheese.disable();
          cheese.reset();
        } else {
          if (this.form.controls.baseCheese.value !== "component.custom.pizza.base.no.cheese"
            || this.form.controls.sauce.value === "component.products.filters.sauce.cream") {
            this.addAllergen("lactose");
          }
          cheese.enable();
        }

        if (this.isGlutenFree()) {
          this.removeAllergen("gluten");
        } else {
          this.addAllergen("gluten");
        }

        const priceOfRemovingAllergen = this.isMediumSize() ? 2 : 4;

        // first emission
        if (old === undefined) {
          this.increasePrice(priceOfRemovingAllergen);
        } else {
          // subsequent emissions
          if (actual.length > old.length) {
            this.increasePrice(priceOfRemovingAllergen);
          }

          if (actual.length < old.length) {
            this.decreasePrice(priceOfRemovingAllergen);
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
      sauce.unsubscribe();
      baseCheese.unsubscribe();
      allergens.unsubscribe();
      meat.unsubscribe();
      cheese.unsubscribe();
      vegetable.unsubscribe();
      others.unsubscribe();
    });
  }

  private updatePrice(arrays: [string[] | undefined, string[] | undefined]) {
    const old = arrays[0];
    const actual = arrays[1]!;
    const priceOfIngredient = this.isMediumSize() ? 1.5 : 2.5;

    if (old === undefined) {
      // first emission
      // have to check for actual not being empty in case "Lactose free" is selected with empty cheese array
      if (actual.length > 0) {
        this.price.update(prevPrice => prevPrice + priceOfIngredient);
        this.ingredientQuantity.update(prevQ => prevQ + 1);
      }
    } else {
      // subsequent emissions
      if (actual) {
        // case when there are cheese items already selected and lactose free was selected
        // so to rest the price of the cheese items when they are removed
        if (actual.length === 0 && old.length > 0) {
          this.price.update(prevPrice => prevPrice - (priceOfIngredient * old.length));
          this.ingredientQuantity.update(prevQ => prevQ - (old.length));
          return;
        }

        if (actual.length > old.length) {
          this.price.update(prevPrice => prevPrice + priceOfIngredient);
          this.ingredientQuantity.update(prevQ => prevQ + 1);
          return;
        }

        if (actual.length < old.length) {
          this.price.update(prevPrice => prevPrice - priceOfIngredient);
          this.ingredientQuantity.update(prevQ => prevQ - 1);
          return;
        }
      }
    }
  }

  private updateLactoseAllergen(arrays: [string[] | undefined, string[] | undefined]) {
    const old = arrays[0]!;
    const actual = arrays[1]!;

    if (old === undefined) {
      // first emission
      if (actual.length > 0 && !this.isLactoseFree()) {
        this.addAllergen("lactose");
      }

    } else {
      // subsequent emissions
      if (actual.length > old.length && !this.isLactoseFree()) {
        this.addAllergen("lactose");
      }

      if (actual.length === 0 && (this.isLactoseFree()
        || this.form.controls.baseCheese.value === 'component.custom.pizza.base.no.cheese'
        || this.form.controls.sauce.value === 'component.products.filters.no.sauce')) {
        this.removeAllergen("lactose");
      }
    }
  }

  private addAllergen(allergen: string) {
    const allergenFullName = this.getFullAllergenName(allergen);
    const index = this.allergens().findIndex(value => value === allergenFullName);
    if (index === -1) {
      this.allergens.update(value => [...value, allergenFullName]);
    }
  }

  private removeAllergen(allergen: string) {
    const allergenFullName = this.getFullAllergenName(allergen);
    const allergens = this.allergens().filter(value => value !== allergenFullName);
    this.allergens.set(allergens);
  }

  private getFullAllergenName(allergen: string) {
    switch (allergen) {
      case "gluten":
        return "component.products.filters.allergen.gluten";
      case "lactose":
        return "component.products.filters.allergen.lactose";
      default:
        return "";
    }
  }

  private increasePrice(amount: number) {
    this.price.update(value => value + amount);
  }

  private decreasePrice(amount: number) {
    this.price.update(value => value - amount);
  }

  private isLactoseFree() {
    return this.form.controls.allergens.value.includes("component.custom.pizza.base.no.lactose");
  }

  private isGlutenFree() {
    return this.form.controls.allergens.value.includes("component.custom.pizza.base.no.gluten");
  }

  private isMediumSize() {
    return this.form.controls.format.value.includes("format.m");
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

  onSubmit() {
    if (isFormValid(this.form)) {
      let ingredients: string[] = [];

      // allergens
      this.form.controls.allergens.value.forEach((ingredient) => {
        ingredients.push(ingredient);
      });

      // format
      ingredients.push(this.form.controls.format.value);

      // base cheese
      ingredients.push(this.form.controls.baseCheese.value);

      // base sauce
      ingredients.push(this.form.controls.sauce.value);

      // meats
      this.form.controls.meat.value.forEach((ingredient) => {
        ingredients.push(ingredient);
      });

      // cheeses
      if (this.form.controls.cheese.value) {
        this.form.controls.cheese.value.forEach((ingredient) => {
          ingredients.push(ingredient);
        });
      }

      // vegetables
      this.form.controls.vegetable.value.forEach((ingredient) => {
        ingredients.push(ingredient);
      });

      // others
      this.form.controls.others.value.forEach((ingredient) => {
        ingredients.push(ingredient);
      });

      this.onNewCustomPizza.emit({
        ingredients: ingredients,
        price: this.price(),
        format: this.form.controls.format.value
      });
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
    }
  ];

  allergenOptions = [
    {
      label: "component.custom.pizza.base.no.gluten",
      value: "component.custom.pizza.base.no.gluten"
    },
    {
      label: "component.custom.pizza.base.no.lactose",
      value: "component.custom.pizza.base.no.lactose"
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
