import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, output, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SelectButton, SelectButtonOptionClickEvent} from 'primeng/selectbutton';
import {TranslatePipe} from '@ngx-translate/core';
import {NgClass, UpperCasePipe} from '@angular/common';
import {Button} from 'primeng/button';
import {toObservable} from '@angular/core/rxjs-interop';

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
    UpperCasePipe,
    FormsModule
  ],
  templateUrl: './create-custom-pizza.component.html',
  styleUrl: './create-custom-pizza.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCustomPizzaComponent implements OnInit {
  onNewCustomPizza = output<CustomPizza>();
  private destroyRef = inject(DestroyRef);
  private gluten = "component.products.filters.allergen.gluten";
  private lactose = "component.products.filters.allergen.lactose";
  private ingredients = signal<string[]>([]);
  private ingredientsObservable = toObservable(this.ingredients);
  protected allergensInfo = signal<string[]>([this.gluten]);
  private excludedAllergens = signal<string[]>([]);
  protected ingredientQuantity = signal<number>(0);
  protected price = signal<number>(0);
  protected format = signal(''); // the format is NOT an ingredient
  protected isLactoseFree = signal(false);
  private isGlutenFree = signal(false);

  ngOnInit(): void {
    const subscription = this.ingredientsObservable.subscribe(ingredients => {
      if (!this.isLactoseFree()) {
        this.checkForLactose(ingredients);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  protected onSubmit() {
    if (this.ingredients().length >= 3 && this.format() !== '' && this.price() > 0) {
      this.onNewCustomPizza.emit({
        ingredients: this.excludedAllergens().length > 0 ? [...this.excludedAllergens(), ...this.ingredients()] : this.ingredients(),
        price: this.price(),
        format: this.format()
      });
    }
  }

  protected onSelectFormat(format: SelectButtonOptionClickEvent) {
    switch (format.option.value) {
      case this.m:
        this.onFormatChange(11);
        break;
      case this.l:
        this.onFormatChange(14);
        break;
    }
  }

  protected onSelectAllergenExclusion(event: SelectButtonOptionClickEvent) {
    const basePrice = this.format() === this.m ? 11 : 14;
    const priceOfAllergenExclusion = this.format() === this.m ? 2 : 4;
    const value = event.option.value;

    if (value === this.glutenFree) {

      if (!this.isGlutenFree()) {
        this.isGlutenFree.set(true);
        this.addAllergenExclusion(this.glutenFree);
        this.removeAllergenFromInfo(this.gluten);
        this.updatePrice("+", priceOfAllergenExclusion);
      } else {
        this.isGlutenFree.set(false);
        this.removeAllergenExclusion(this.glutenFree);
        this.addAllergenToInfo(this.gluten);
        this.updatePrice("-", priceOfAllergenExclusion);
      }
    }

    if (value === this.lactoseFree) {
      // reset previously selected ingredients
      this.sauceControl = "";
      this.baseCheeseControl = "";
      this.meatControl = "";
      this.cheeseControl = "";
      this.vegetableControl = "";
      this.otherControl = "";

      // partial reset
      this.ingredients.set([]);
      this.ingredientQuantity.set(0);
      this.excludedAllergens.set(this.isGlutenFree() ? [this.glutenFree] : []);

      if (!this.isLactoseFree()) {
        this.isLactoseFree.set(true);
        this.addAllergenExclusion(this.lactoseFree);
        this.removeAllergenFromInfo(this.lactose);
        const priceWithLactoseFree = basePrice + priceOfAllergenExclusion;
        this.price.set(this.isGlutenFree() ? priceWithLactoseFree + priceOfAllergenExclusion : priceWithLactoseFree);
      } else {
        this.isLactoseFree.set(false);
        this.removeAllergenExclusion(this.lactoseFree);
        // not adding Lactose to allergensInfo here; this.checkForLactose(ingredients) in the subscription will handle it
        this.price.set(this.isGlutenFree() ? basePrice + priceOfAllergenExclusion : basePrice);
      }
    }
  }

  private checkForLactose(ingredients: string[]) {
    const lactoseProducts = ["cheese", "cream"];

    if (ingredients.length === 0) {
      this.excludedAllergens.set(this.isGlutenFree() ? [this.glutenFree] : []);
      this.allergensInfo.set(this.isGlutenFree() ? [] : [this.gluten]);
      return;
    }

    for (let i = 0; i < ingredients.length; i++) {
      const ingredient = ingredients[i];

      if (ingredient.includes(lactoseProducts[0]) || ingredient.includes(lactoseProducts[1])) {
        this.removeAllergenExclusion(this.lactoseFree);
        this.addAllergenToInfo(this.lactose);
        break;
      } else {
        this.addAllergenExclusion(this.lactoseFree);
        this.removeAllergenFromInfo(this.lactose);
      }
    }
  }

  protected onSelectBaseSauce(event: SelectButtonOptionClickEvent) {
    const value = event.option.value;

    switch (value) {
      case this.tomatoSauce: {
        this.handleOldEssential(this.creamSauce);
        this.handleNewEssential(value);
        break;
      }
      case this.creamSauce: {
        this.handleOldEssential(this.tomatoSauce);
        this.handleNewEssential(value);
        break;
      }
    }
  }

  protected onSelectBaseCheese(event: SelectButtonOptionClickEvent) {
    const value = event.option.value;

    switch (value) {
      case this.mozzarella: {
        this.handleOldEssential(this.doubleMozzarella);
        this.handleNewEssential(value);
        break;
      }
      case this.doubleMozzarella: {
        this.handleOldEssential(this.mozzarella);
        this.handleNewEssential(value);
        break;
      }
    }
  }

  protected onSelectIngredient(event: SelectButtonOptionClickEvent) {
    const priceOfIngredient = this.format() === this.m ? 1.5 : 2.5;
    this.handleNewIngredient(event.option.value, priceOfIngredient);
  }

  private addAllergenExclusion(allergenExclusion: string) {
    if (!this.excludedAllergens().includes(allergenExclusion)) {
      this.excludedAllergens.update(value => [...value, allergenExclusion]);
    }
  }

  private removeAllergenExclusion(allergenExclusion: string) {
    if (this.excludedAllergens().includes(allergenExclusion)) {
      this.excludedAllergens.set(this.excludedAllergens().filter(value => value !== allergenExclusion));
    }
  }

  private addAllergenToInfo(allergen: string) {
    if (!this.allergensInfo().includes(allergen)) {
      this.allergensInfo.update(value => [...value, allergen]);
    }
  }

  private removeAllergenFromInfo(allergen: string) {
    if (this.allergensInfo().includes(allergen)) {
      this.allergensInfo.set(this.allergensInfo().filter(value => value !== allergen));
    }
  }

  private handleOldEssential(old: string) {
    if (this.ingredients().includes(old)) {
      this.ingredients.set(this.ingredients().filter(value => value !== old));
      this.updateQuantity("-");
    }
  }

  private handleNewEssential(value: string) {
    if (this.ingredients().includes(value)) {
      this.updateQuantity("-");
      this.ingredients.set(this.ingredients().filter(old => old !== value));

    } else {
      this.updateQuantity("+");
      this.ingredients.update(actual => [...actual, value]);
    }
  }

  private handleNewIngredient(value: string, price: number) {
    if (this.ingredients().includes(value)) {
      this.updatePrice("-", price);
      this.updateQuantity("-");
      this.ingredients.set(this.ingredients().filter(old => old !== value));

    } else {
      this.updatePrice("+", price);
      this.updateQuantity("+");
      this.ingredients.update(actual => [...actual, value]);
    }
  }

  private updatePrice(operation: '+' | '-', price: number) {
    if (operation === '-') {
      this.price.update(value => value - price);
    } else if (operation === '+') {
      this.price.update(value => value + price);
    }
  }

  private updateQuantity(operation: '+' | '-') {
    if (operation === '-') {
      this.ingredientQuantity.update(value => value - 1);
    } else if (operation === '+') {
      this.ingredientQuantity.update(value => value + 1);
    }
  }

  protected formatControl = "";
  protected sauceControl = "";
  protected baseCheeseControl = "";
  protected allergensControl = "";
  protected meatControl = "";
  protected cheeseControl = "";
  protected vegetableControl = "";
  protected otherControl = "";

  private deselectValues() {
    this.formatControl = "";
    this.sauceControl = "";
    this.baseCheeseControl = "";
    this.allergensControl = "";
    this.meatControl = "";
    this.cheeseControl = "";
    this.vegetableControl = "";
    this.otherControl = "";
  }

  protected reset() {
    this.deselectValues();
    this.ingredients.set([]);
    this.excludedAllergens.set([]);
    this.allergensInfo.set(["component.products.filters.allergen.gluten"]);
    this.ingredientQuantity.set(0);
    this.price.set(0);
    this.format.set('');
    this.isLactoseFree.set(false);
    this.isGlutenFree.set(false);
  }

  private onFormatChange(price: number) {
    this.deselectValues();
    this.ingredients.set([]);
    this.excludedAllergens.set([]);
    this.allergensInfo.set(["component.products.filters.allergen.gluten"]);
    this.ingredientQuantity.set(0);
    this.price.set(price);
    this.isLactoseFree.set(false);
    this.isGlutenFree.set(false);
    this.format.set(price === 11 ? this.m : this.l);
    this.formatControl = this.format(); // it only unchecks if value !== '', so have to set it back here, otherwise on reset() it wont uncheck
  }

  private m = 'component.custom.pizza.format.m';
  private l = 'component.custom.pizza.format.l';
  private tomatoSauce = 'component.products.filters.sauce.tomato';
  private creamSauce = 'component.products.filters.sauce.cream';
  private mozzarella = 'component.products.filters.cheese.mozzarella';
  private doubleMozzarella = 'component.products.filters.cheese.double.mozzarella';
  private glutenFree = 'component.custom.pizza.base.no.gluten';
  private lactoseFree = 'component.custom.pizza.base.no.lactose';

  protected formatOptions = [
    {
      label: this.m,
      value: this.m,
    },
    {
      label: this.l,
      value: this.l
    }
  ];

  protected sauceOptions = [
    {
      label: this.tomatoSauce,
      value: this.tomatoSauce,
    },
    {
      label: this.creamSauce,
      value: this.creamSauce,
    }
  ];

  protected baseCheeseOptions = [
    {
      label: this.mozzarella,
      value: this.mozzarella
    },
    {
      label: this.doubleMozzarella,
      value: this.doubleMozzarella,
    },
  ];

  protected allergenOptions = [
    {
      label: this.lactoseFree,
      value: this.lactoseFree
    },
    {
      label: this.glutenFree,
      value: this.glutenFree
    }
  ];

  protected meatOptions = [
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

  protected cheeseOptions = [
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

  protected vegetableOptions = [
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

  protected otherOptions = [
    {
      label: "component.products.filters.oil.truffle",
      value: "component.products.filters.oil.truffle"
    },
  ];
}
