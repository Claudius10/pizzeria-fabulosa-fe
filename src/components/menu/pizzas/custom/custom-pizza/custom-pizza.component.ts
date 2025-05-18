import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Dialog} from "primeng/dialog";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {NgOptimizedImage, UpperCasePipe} from "@angular/common";
import {v4 as uuidv4} from 'uuid';
import {CreateCustomPizzaComponent, CustomPizza} from '../create-custom-pizza/create-custom-pizza.component';
import {CartService} from '../../../../../services/cart/cart.service';
import {Button} from 'primeng/button';
import {getDarkIcon, getLightIcon} from '../../../../../utils/functions';

@Component({
  selector: 'app-custom-pizza',
  imports: [
    TranslatePipe,
    Button,
    Dialog,
    CreateCustomPizzaComponent,
    NgOptimizedImage,
    UpperCasePipe
  ],
  templateUrl: './custom-pizza.component.html',
  styleUrl: './custom-pizza.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomPizzaComponent {
  private cartService = inject(CartService);
  private translateService = inject(TranslateService);
  protected customPizzaDialogVisible = false;

  protected addCustomPizza(pizza: CustomPizza) {
    const isMedium = pizza.format.includes("format.m");

    this.cartService.add({
      pseudoId: uuidv4(),
      formatCode: this.translateToken("en", pizza.format),
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
        en: this.translateTokens("en", pizza.ingredients),
        es: this.translateTokens("es", pizza.ingredients),
      },
      formats: this.getFormats(isMedium, pizza),
      quantity: 1,
      price: pizza.price,
    });

    this.closeCustomPizzaDialog();
  }

  protected openCustomPizzaDialog() {
    this.customPizzaDialogVisible = true;
  }

  protected closeCustomPizzaDialog() {
    this.customPizzaDialogVisible = false;
  }

  private translateToken(to: string, token: string): string {
    const translations = this.translateService.translations;
    const translation = translations[to];
    return translation[token];
  }

  private translateTokens(to: string, tokens: string[]): string[] {
    const translations = this.translateService.translations;
    const translation = translations[to];
    return tokens.map(token => {
      return translation[token];
    });
  }

  private getFormats(isMedium: boolean, pizza: CustomPizza): { [key: string]: { [key: string]: string; }; } {
    if (isMedium) {
      return {
        'm': {
          'en': this.translateToken("en", pizza.format),
          'es': this.translateToken("es", pizza.format),
        }
      };
    } else {
      return {
        'l': {
          'en': this.translateToken("en", pizza.format),
          'es': this.translateToken("es", pizza.format),
        }
      };
    }
  }
}
