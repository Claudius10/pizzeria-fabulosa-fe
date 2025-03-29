import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {CartService} from '../../../../services/cart/cart.service';
import {Button} from 'primeng/button';
import {ProductDTO} from '../../../../utils/interfaces/dto/resources';
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
  readonly product = input.required<ProductDTO>();
  private translateService = inject(TranslateService);
  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);
  protected readonly currentLang = signal(this.translateService.currentLang);
  protected productFormat = "";
  protected productPrice = 0;
  protected dialogVisible = false;

  ngOnInit(): void {
    this.setDefaults(this.product());

    const subscription = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  protected addProductToCart(product: ProductDTO) {
    this.cartService.add({
      id: product.id + this.productFormat,
      formatCode: this.productFormat,
      images: {
        dark: getDarkIcon(product.type),
        light: getLightIcon(product.type)
      },
      type: product.type,
      name: product.name,
      description: product.description,
      formats: {
        s: this.productFormat === "S" ? {
          en: product.formats.s.en,
          es: product.formats.s.es,
        } : null,
        m: this.productFormat === "M" ? {
          en: product.formats.m.en,
          es: product.formats.m.es,
        } : null,
        l: this.productFormat === "L" ? {
          en: product.formats.l.en,
          es: product.formats.l.es,
        } : null,
      },
      price: this.productPrice,
      quantity: 1,
    });

    this.dialogVisibility(false);
    this.setDefaults(this.product());
  }

  protected setFormat(format: string) {
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

  protected dialogVisibility(value: boolean) {
    if (!value) {
      this.setDefaults(this.product());
    }
    this.dialogVisible = value;
  }

  private setDefaults(product: ProductDTO) {
    this.productFormat = product.formats.m === undefined ? "S" : "M";
    this.productPrice = product.prices.m === undefined ? product.prices.s : product.prices.m;
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
