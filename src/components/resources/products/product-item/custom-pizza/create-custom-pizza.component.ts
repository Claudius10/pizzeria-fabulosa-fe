import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SelectButton} from 'primeng/selectbutton';
import {Button} from 'primeng/button';
import {isFormValid} from '../../../../../utils/functions';
import {NgClass, UpperCasePipe} from '@angular/common';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {pairwise, startWith} from 'rxjs';

@Component({
  selector: 'app-create-custom-pizza',
  imports: [
    ReactiveFormsModule,
    SelectButton,
    Button,
    NgClass,
    TranslatePipe,
    UpperCasePipe
  ],
  templateUrl: './create-custom-pizza.component.html',
  styleUrl: './create-custom-pizza.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCustomPizzaComponent implements OnInit {
  private translateService = inject(TranslateService);
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
        if (format.includes("format.m")) {
          this.decreasePrice(4);
        } else if (format.includes("format.l")) {
          this.increasePrice(4);
        }
      }
    });

    const sauce = this.form.controls.sauce.valueChanges.subscribe({
      next: sauce => {
        console.log("sauce");
        if (sauce.includes("sauce.cream") && !this.form.controls.allergens.value.includes("component.custom.pizza.base.no.lactose")) {
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
        console.log("baseCheese");
        // if No base cheese was selected && if there are no other cheeses selected, remove lactose allergen
        if (baseCheese === "component.custom.pizza.base.no.cheese" && this.form.controls.cheese.value.length === 0) {
          this.removeAllergen("lactose");
        }

        // if an option other than No base cheese was selected, add lactose allergen
        if (baseCheese !== "component.custom.pizza.base.no.cheese" && !this.form.controls.allergens.value.includes("component.custom.pizza.base.no.lactose")) {
          this.addAllergen("lactose");
        }
      }
    });

    const allergens = this.form.controls.allergens.valueChanges.pipe(startWith(undefined), pairwise()).subscribe({
      next: arrays => {
        console.log("allergens");
        const old = arrays[0];
        const actual = arrays[1]!;
        const cheese = this.form.controls.cheese;

        if (actual.includes("component.custom.pizza.base.no.lactose")) {
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

        if (actual.includes("component.custom.pizza.base.no.gluten")) {
          this.removeAllergen("gluten");
        } else {
          this.addAllergen("gluten");
        }

        // first emission
        if (old === undefined) {
          this.increasePrice(2);
        } else {
          // subsequent emissions
          if (actual.length > old.length) {
            this.increasePrice(2);
          }

          if (actual.length < old.length) {
            this.decreasePrice(2);
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

  updatePrice(arrays: [string[] | undefined, string[] | undefined]) {
    const old = arrays[0];
    const actual = arrays[1]!;

    if (old === undefined) {
      // first emission
      // have to check for actual not being empty in case "Lactose free" is selected with empty cheese array
      if (actual.length > 0) {
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
    console.log("updateLactoseAllergen ");
    const old = arrays[0]!;
    const actual = arrays[1]!;

    if (old === undefined) {
      // first emission
      if (actual.length > 0) {
        this.addAllergen("lactose");
      }

    } else {
      // subsequent emissions
      if (actual.length > old.length) {
        this.addAllergen("lactose");
      }

      if (actual.length < old.length) {
        this.removeAllergen("lactose");
      }
    }
  }

  addAllergen(allergen: string) {
    const allergenFullName = this.getFullAllergenName(allergen);
    const index = this.allergens().findIndex(value => value === allergenFullName);
    if (index === -1) {
      console.log("add", allergen);
      this.allergens.update(value => [...value, allergenFullName]);
    }
  }

  removeAllergen(allergen: string) {
    console.log("remove", allergen);
    const allergenFullName = this.getFullAllergenName(allergen);
    const allergens = this.allergens().filter(value => value !== allergenFullName);
    this.allergens.set(allergens);
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

  increasePrice(amount: number) {
    this.price.update(value => value + amount);
  }

  decreasePrice(amount: number) {
    this.price.update(value => value - amount);
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
      console.log(this.form.value);

      // allergens
      this.form.controls.allergens.value.forEach((ingredient) => {
        ingredients.push(this.translateService.instant(ingredient));
      });

      // format
      ingredients.push(this.translateService.instant(this.form.controls.format.value));

      // base cheese
      ingredients.push(this.translateService.instant(this.form.controls.baseCheese.value));

      // base sauce
      ingredients.push(this.translateService.instant(this.form.controls.sauce.value));

      // meats
      this.form.controls.meat.value.forEach((ingredient) => {
        ingredients.push(this.translateService.instant(ingredient));
      });

      // cheeses
      if (this.form.controls.cheese.value) {
        this.form.controls.cheese.value.forEach((ingredient) => {
          ingredients.push(this.translateService.instant(ingredient));
        });
      }

      // vegetables
      this.form.controls.vegetable.value.forEach((ingredient) => {
        ingredients.push(this.translateService.instant(ingredient));
      });

      // others
      this.form.controls.others.value.forEach((ingredient) => {
        ingredients.push(this.translateService.instant(ingredient));
      });

      console.log(ingredients.join(", "));
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
