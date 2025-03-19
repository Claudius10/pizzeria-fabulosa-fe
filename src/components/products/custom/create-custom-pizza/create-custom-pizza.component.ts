import {ChangeDetectionStrategy, Component, OnInit, output, signal} from '@angular/core';
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
  ingredients = signal<string[]>([]);
  ingredientsObservable = toObservable(this.ingredients);
  allergens = signal<string[]>(["component.products.filters.allergen.gluten"]);
  ingredientQuantity = signal<number>(0);
  price = signal<number>(0);
  format = '';
  lactoseFree = false;

  ngOnInit(): void {
    this.ingredientsObservable.subscribe({
      next: ingredients => {
        console.log(ingredients);
        console.log(this.lactoseFree);
        if (!this.lactoseFree) {
          this.checkForLactose();
        }
      }
    });
  }

  onSelectFormat(format: SelectButtonOptionClickEvent) {
    const value = format.option.value;

    switch (value) {
      case this.m: {
        this.onFormatChange(11);
        this.handleOld(this.l);
        this.handleSize(value);
        break;
      }
      case this.l: {
        this.onFormatChange(14);
        this.handleOld(this.m);
        this.handleSize(value);
        break;
      }
    }
  }

  onSelectAllergenExclusion(event: SelectButtonOptionClickEvent) {
    const priceOfAllergen = this.isMediumSize() ? 2 : 4;
    const value = event.option.value;
    this.handleNewAllergen(value, priceOfAllergen);
    if (value === this.gluten) {
      this.handleAllergenExclusion(this.getAllergenName(value));
    } else {
      this.onLactoseFreeToggle();
      if (!this.lactoseFree) {
        this.lactoseFree = true;
        this.removeAllergen(this.lactose);
        this.handleNewAllergen(value, priceOfAllergen);
      } else {
        this.lactoseFree = false;
      }
    }
  }

  onSelectBaseSauce(event: SelectButtonOptionClickEvent) {
    const value = event.option.value;

    switch (value) {
      case this.tomatoSauce: {
        this.handleOld(this.creamSauce);
        this.handleNewEssential(value);
        break;
      }
      case this.creamSauce: {
        this.handleOld(this.tomatoSauce);
        this.handleNewEssential(value);
        break;
      }
    }
  }

  onSelectBaseCheese(event: SelectButtonOptionClickEvent) {
    const value = event.option.value;

    switch (value) {
      case this.mozzarella: {
        this.handleOld(this.doubleMozzarella);
        this.handleNewEssential(value);
        break;
      }
      case this.doubleMozzarella: {
        this.handleOld(this.mozzarella);
        this.handleNewEssential(value);
        break;
      }
    }
  }

  onSelectMeat(event: SelectButtonOptionClickEvent) {
    const priceOfIngredient = this.isMediumSize() ? 1.5 : 2.5;
    this.handleNewIngredient(event.option.value, priceOfIngredient);
  }

  onSelectCheese(event: SelectButtonOptionClickEvent) {
    const priceOfIngredient = this.isMediumSize() ? 1.5 : 2.5;
    this.handleNewIngredient(event.option.value, priceOfIngredient);
  }

  onSelectVegetable(event: SelectButtonOptionClickEvent) {
    const priceOfIngredient = this.isMediumSize() ? 1.5 : 2.5;
    this.handleNewIngredient(event.option.value, priceOfIngredient);
  }

  onSelectOther(event: SelectButtonOptionClickEvent) {
    const priceOfIngredient = this.isMediumSize() ? 1.5 : 2.5;
    this.handleNewIngredient(event.option.value, priceOfIngredient);
  }

  private handleOld(old: string) {
    if (this.ingredients().includes(old)) {
      this.ingredients.set(this.ingredients().filter(value => value !== old));
    }
  }

  private handleSize(value: string) {
    if (this.ingredients().includes(value)) {
      this.ingredients.set(this.ingredients().filter(old => old !== value));

    } else {
      this.ingredients.update(actual => [...actual, value]);
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

  private handleNewAllergen(value: string, price: number) {
    if (this.ingredients().includes(value)) {
      this.updatePrice("-", price);
      this.ingredients.set(this.ingredients().filter(old => old !== value));

    } else {
      this.updatePrice("+", price);
      this.ingredients.update(actual => [...actual, value]);
    }
  }

  private updatePrice(operation: '+' | '-', price: number,) {
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

  private handleAllergenExclusion(allergen: string) {
    if (this.allergens().includes(allergen)) {
      this.allergens.set(this.allergens().filter(value => value !== allergen));
    } else {
      this.allergens.update(value => [...value, allergen]);
    }
  }

  private checkForLactose() {
    const lactoseProducts = ["cheese", "cream"];
    const ingredients = this.ingredients();

    if (ingredients.length === 0) {
      this.removeAllergen(this.lactose);
      return;
    }

    for (let i = 0; i < ingredients.length; i++) {
      const ingredient = ingredients[i];

      if (ingredient.includes(lactoseProducts[0]) || ingredient.includes(lactoseProducts[1])) {
        this.addAllergen(this.lactose);
        break;
      } else {
        this.removeAllergen(this.lactose);
      }
    }
  }

  private addAllergen(allergen: string) {
    const allergenFullName = this.getAllergenName(allergen);
    const index = this.allergens().findIndex(value => value === allergenFullName);
    if (index === -1) {
      this.allergens.update(value => [...value, allergenFullName]);
    }
  }

  private removeAllergen(allergen: string) {
    const allergenFullName = this.getAllergenName(allergen);
    const allergens = this.allergens().filter(value => value !== allergenFullName);
    this.allergens.set(allergens);
  }

  private getAllergenName(allergen: string) {
    switch (allergen) {
      case this.gluten:
        return "component.products.filters.allergen.gluten";
      case this.lactose:
        return "component.products.filters.allergen.lactose";
      default:
        return "";
    }
  }

  onSubmit() {
    if (this.ingredients().length >= 3 && this.format !== '' && this.price() > 0) {
      this.onNewCustomPizza.emit({
        ingredients: this.ingredients(),
        price: this.price(),
        format: this.format
      });
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

  private formReset() {
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
    this.formReset();
    this.ingredients.set([]);
    this.allergens.set(["component.products.filters.allergen.gluten"]);
    this.ingredientQuantity.set(0);
    this.price.set(0);
    this.format = '';
  }

  private onFormatChange(price: number) {
    const format = price === 11 ? this.m : this.l;
    this.formReset();
    this.ingredients.set([]);
    this.allergens.set(["component.products.filters.allergen.gluten"]);
    this.ingredientQuantity.set(0);
    this.price.set(price);
    this.format = format;
    this.formatControl = format; // it only unchecks if value !== '', so have to set it back here, otherwise on reset() it wont uncheck
  }

  private onLactoseFreeToggle() {
    this.sauceControl = "";
    this.baseCheeseControl = "";
    this.allergensControl = "";
    this.meatControl = "";
    this.cheeseControl = "";
    this.vegetableControl = "";
    this.otherControl = "";
    this.ingredients.set([]);
    this.ingredientQuantity.set(0);
    this.price.set(this.format === this.m ? 11 : 14);
  }

  private isMediumSize() {
    return this.format === "component.custom.pizza.format.m";
  }

  private m = 'component.custom.pizza.format.m';
  private l = 'component.custom.pizza.format.l';
  private tomatoSauce = 'component.products.filters.sauce.tomato';
  private creamSauce = 'component.products.filters.sauce.cream';
  private mozzarella = 'component.products.filters.cheese.mozzarella';
  private doubleMozzarella = 'component.products.filters.cheese.double.mozzarella';
  private gluten = 'component.custom.pizza.base.no.gluten';
  private lactose = 'component.custom.pizza.base.no.lactose';

  formatOptions = [
    {
      label: this.m,
      value: this.m,
    },
    {
      label: this.l,
      value: this.l
    }
  ];

  sauceOptions = [
    {
      label: this.tomatoSauce,
      value: this.tomatoSauce,
    },
    {
      label: this.creamSauce,
      value: this.creamSauce,
    }
  ];

  baseCheeseOptions = [
    {
      label: this.mozzarella,
      value: this.mozzarella
    },
    {
      label: this.doubleMozzarella,
      value: this.doubleMozzarella,
    },
  ];

  allergenOptions = [
    {
      label: this.lactose,
      value: this.lactose
    },
    {
      label: this.gluten,
      value: this.gluten
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
