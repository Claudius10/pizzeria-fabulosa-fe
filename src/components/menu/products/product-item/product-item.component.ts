import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {CartService} from '../../../../services/cart/cart.service';
import {Button} from 'primeng/button';
import {ProductDTO} from '../../../../interfaces/dto/resources';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ProductPriceComponent} from './price/product-price.component';
import {Dialog} from 'primeng/dialog';
import {getDarkIcon, getLightIcon} from '../../../../utils/functions';

@Component({
  selector: 'app-product',
  imports: [
    NgClass,
    Button,
    ProductPriceComponent,
    Dialog,
    TranslatePipe,
    NgOptimizedImage
  ],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent implements OnInit {
  product = input.required<ProductDTO>();
  private translateService = inject(TranslateService);
  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);
  currentLang = signal(this.translateService.currentLang);
  productFormat = "";
  productPrice = 0;
  dialogVisible = false;

  ngOnInit(): void {
    if (this.product().formats) {
      this.productFormat = this.product().formats.m === undefined ? "S" : "M";
    }

    if (this.product().prices) {
      this.productPrice = this.product().prices.m === undefined ? this.product().prices.s : this.product().prices.m;
    }

    const subscription = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  addProductToCart() {
    this.cartService.add({
      id: this.product().id + this.productFormat,
      formatCode: this.productFormat,
      images: {
        dark: getDarkIcon(this.product().type),
        light: getLightIcon(this.product().type)
      },
      type: this.product().type,
      name: this.product().name,
      description: this.product().description,
      formats: {
        s: this.productFormat === "S" ? {
          en: this.product().formats.s.en,
          es: this.product().formats.s.es,
        } : null,
        m: this.productFormat === "M" ? {
          en: this.product().formats.m.en,
          es: this.product().formats.m.es,
        } : null,
        l: this.productFormat === "L" ? {
          en: this.product().formats.l.en,
          es: this.product().formats.l.es,
        } : null,
      },
      price: this.productPrice,
      quantity: 1,
    });
    this.closeDialog();
  }

  setFormat(format: string) {
    this.productFormat = format;
    this.updatePrice(format);
  }

  private updatePrice(format: string) {
    switch (format) {
      case 'S':
        this.productPrice = this.product().prices.s;
        break;
      case 'M':
        this.productPrice = this.product().prices.m;
        break;
      case 'L':
        this.productPrice = this.product().prices.l;
        break;
    }
  }

  openDialog() {
    this.dialogVisible = true;
  }

  closeDialog() {
    this.dialogVisible = false;
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
