import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {NgClass, NgForOf, NgIf, UpperCasePipe} from '@angular/common';
import {CartService} from '../../../../services/cart/cart.service';
import {Button} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {ProductDTO} from '../../../../interfaces/dto/resources';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ProductPriceComponent} from './price/product-price.component';
import {Dialog} from 'primeng/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {CreateCustomPizzaComponent, CustomPizza} from './custom-pizza/create-custom-pizza.component';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-product',
  imports: [
    Button,
    PanelModule,
    NgClass,
    ProductPriceComponent,
    ReactiveFormsModule,
    TranslatePipe,
    NgForOf,
    NgIf,
    CreateCustomPizzaComponent,
    Dialog,
    UpperCasePipe
  ],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent implements OnInit {
  public product = input.required<ProductDTO>();
  private cartService = inject(CartService);
  private translateService = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  currentLang = signal(this.translateService.currentLang);
  productFormat = signal<string>("");
  productPrice = signal<number>(0);
  allergensDialogVisible = false;
  customPizzaDialogVisible = false;

  ngOnInit(): void {
    if (this.product().formats) {
      this.productFormat.set(this.product().formats.m === undefined ? "S" : "M");
    }

    if (this.product().prices) {
      this.productPrice.set(this.product().prices.m === undefined ? this.product().prices.s : this.product().prices.m);
    }

    const subscription = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  addProductToCart() {
    this.cartService.add({
      id: uuidv4(),
      code: this.product().code,
      image: this.product().image,
      productType: this.product().productType,
      name: this.product().name,
      description: this.product().description,
      prices: this.product().prices,
      formats: this.product().formats,
      quantity: 1,
      price: this.productPrice(),
      format: this.productFormat(),
      allergens: this.product().allergens
    });
  }

  addCustomPizza(pizza: CustomPizza) {
    this.closeCustomPizzaDialog();
    this.cartService.add({
      id: uuidv4(),
      code: pizza.ingredients.join(", "),
      image: this.product().image,
      productType: "CustomPizza",
      name: {
        en: "My Pizza",
        es: "Mi Pizza"
      },
      description: {
        en: pizza.ingredients,
        es: pizza.ingredients
      },
      prices: this.product().prices,
      formats: this.product().formats,
      quantity: 1,
      price: pizza.price,
      format: pizza.format,
      allergens: this.product().allergens
    });
  }

  updatePrice(format: string) {
    switch (format) {
      case 'S':
        this.productPrice.set(this.product().prices.s);
        break;
      case 'M':
        this.productPrice.set(this.product().prices.m);
        break;
      case 'L':
        this.productPrice.set(this.product().prices.l);
        break;
    }
  }

  setFormat(format: string) {
    this.productFormat.set(format);
    this.updatePrice(format);
  }

  openCustomPizzaDialog() {
    this.customPizzaDialogVisible = true;
  }

  closeCustomPizzaDialog() {
    this.customPizzaDialogVisible = false;
  }

  openAllergensDialog() {
    this.allergensDialogVisible = true;
  }

  closeAllergensDialog() {
    this.allergensDialogVisible = false;
  }
}
