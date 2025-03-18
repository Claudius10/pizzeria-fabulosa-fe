import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {NgClass, NgOptimizedImage, UpperCasePipe} from '@angular/common';
import {CartService} from '../../../services/cart/cart.service';
import {Button} from 'primeng/button';
import {ProductDTO} from '../../../interfaces/dto/resources';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ProductPriceComponent} from './price/product-price.component';
import {Dialog} from 'primeng/dialog';
import {getDarkIcon, getLightIcon} from '../../../utils/functions';

@Component({
  selector: 'app-product',
  imports: [
    NgClass,
    Button,
    ProductPriceComponent,
    Dialog,
    TranslatePipe,
    UpperCasePipe,
    NgOptimizedImage
  ],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent implements OnInit {
  product = input<ProductDTO>();
  private translateService = inject(TranslateService);
  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);
  currentLang = signal(this.translateService.currentLang);
  productFormat = "";
  productPrice = 0;
  allergensDialogVisible = false;
  theProduct = signal<ProductDTO>(productPlaceholder());

  ngOnInit(): void {
    this.theProduct.set(this.product()!);

    if (this.theProduct().formats) {
      this.productFormat = this.theProduct().formats.m === undefined ? "S" : "M";
    }

    if (this.theProduct().prices) {
      this.productPrice = this.theProduct().prices.m === undefined ? this.theProduct().prices.s : this.theProduct().prices.m;
    }

    const subscription = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  addProductToCart() {
    this.cartService.add({
      id: this.theProduct().id + this.productFormat,
      formatCode: this.productFormat,
      images: {
        dark: getDarkIcon(this.theProduct().type),
        light: getLightIcon(this.theProduct().type)
      },
      type: this.theProduct().type,
      name: this.theProduct().name,
      description: this.theProduct().description,
      formats: {
        s: this.productFormat === "S" ? {
          en: this.theProduct().formats.s.en,
          es: this.theProduct().formats.s.es,
        } : null,
        m: this.productFormat === "M" ? {
          en: this.theProduct().formats.m.en,
          es: this.theProduct().formats.m.es,
        } : null,
        l: this.productFormat === "L" ? {
          en: this.theProduct().formats.l.en,
          es: this.theProduct().formats.l.es,
        } : null,
      },
      price: this.productPrice,
      quantity: 1,
    });
  }

  setFormat(format: string) {
    this.productFormat = format;
    this.updatePrice(format);
  }

  private updatePrice(format: string) {
    switch (format) {
      case 'S':
        this.productPrice = this.theProduct().prices.s;
        break;
      case 'M':
        this.productPrice = this.theProduct().prices.m;
        break;
      case 'L':
        this.productPrice = this.theProduct().prices.l;
        break;
    }
  }

  openAllergensDialog() {
    this.allergensDialogVisible = true;
  }

  closeAllergensDialog() {
    this.allergensDialogVisible = false;
  }
}

export const productPlaceholder = (): ProductDTO => {
  return {
    name: {
      en: "...",
      es: "...",
    },
    formats: {
      s: {
        en: "...",
        es: "...",
      },
      m: {
        en: "...",
        es: "...",
      },
      l: {
        en: "...",
        es: "...",
      }
    },
    description: {
      en: ["..."],
      es: ["..."]
    },
    type: "...",
    image: "/assets/products/placeholder.png",
    prices: {
      s: 0,
      m: 0,
      l: 0
    },
    allergens: {
      en: ["..."],
      es: ["..."]
    },
    id: "1"
  };
};
