import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Dialog} from "primeng/dialog";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {NgOptimizedImage, UpperCasePipe} from "@angular/common";
import {v4 as uuidv4} from 'uuid';
import {CreateCustomPizzaComponent, CustomPizza} from '../create-custom-pizza/create-custom-pizza.component';
import {CartService} from '../../../../services/cart/cart.service';
import {Button} from 'primeng/button';
import {getDarkIcon, getLightIcon} from '../../../../utils/functions';

@Component({
  selector: 'app-custom-pizza',
  imports: [
    TranslatePipe,
    UpperCasePipe,
    Button,
    Dialog,
    CreateCustomPizzaComponent,
    NgOptimizedImage
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
    const isMedium = pizza.format.includes("format.m");
    this.cartService.add({
      id: uuidv4(),
      images: {
        dark: getDarkIcon('pizza'),
        light: getLightIcon('pizza'),
      },
      type: "pizza",
      name: {
        en: "My Pizza",
        es: "Mi Pizza"
      },
      description: {
        en: this.translateIngredients("en", pizza.ingredients),
        es: this.translateIngredients("es", pizza.ingredients),
      },
      formats: {
        s: null,
        m: isMedium ? {
          en: this.translateIngredient("en", pizza.format),
          es: this.translateIngredient("es", pizza.format),
        } : null,
        l: !isMedium ? {
          en: this.translateIngredient("en", pizza.format),
          es: this.translateIngredient("es", pizza.format),
        } : null
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

  private translateIngredient(to: string, ingredient: string): string {
    const translations = this.translateService.translations;
    const translation = translations[to];
    return translation[ingredient];
  }

  private translateIngredients(to: string, ingredients: string[]): string[] {
    const translations = this.translateService.translations;
    const translation = translations[to];
    return ingredients.map(ingredient => {
      return translation[ingredient];
    });
  }
}
