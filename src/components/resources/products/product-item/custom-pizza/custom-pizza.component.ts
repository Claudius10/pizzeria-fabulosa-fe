import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Dialog} from "primeng/dialog";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {UpperCasePipe} from "@angular/common";
import {v4 as uuidv4} from 'uuid';
import {CreateCustomPizzaComponent, CustomPizza} from '../create-custom-pizza/create-custom-pizza.component';
import {CartService} from '../../../../../services/cart/cart.service';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-custom-pizza',
  imports: [
    Dialog,
    TranslatePipe,
    UpperCasePipe,
    CreateCustomPizzaComponent,
    Button
  ],
  templateUrl: './custom-pizza.component.html',
  styleUrl: './custom-pizza.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomPizzaComponent {
  private cartService = inject(CartService);
  private translateService = inject(TranslateService);
  customPizzaDialogVisible = false;

  addCustomPizza(pizza: CustomPizza) {
    this.closeCustomPizzaDialog();
    const enIngredients = this.translateIngredients("en", pizza.ingredients);
    const esIngredients = this.translateIngredients("es", pizza.ingredients);
    const ingredients = {
      en: enIngredients,
      es: esIngredients
    };
    this.cartService.add({
      id: uuidv4(),
      type: "CustomPizza",
      name: {
        en: "My Pizza",
        es: "Mi Pizza"
      },
      description: {
        en: enIngredients,
        es: esIngredients,
      },
      formats: {
        s: {
          en: "",
          es: ""
        },
        m: {
          en: "",
          es: ""
        },
        l: {
          en: "",
          es: ""
        }
      },
      quantity: 1,
      price: pizza.price,
    });
  }

  openCustomPizzaDialog() {
    this.customPizzaDialogVisible = true;
  }

  closeCustomPizzaDialog() {
    this.customPizzaDialogVisible = false;
  }

  translateIngredients(to: string, ingredients: string[]) {
    const translations = this.translateService.translations;
    const translation = translations[to];
    return ingredients.map(ingredient => {
      return translation[ingredient];
    });
  }
}
