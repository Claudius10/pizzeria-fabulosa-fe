import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {NgOptimizedImage, UpperCasePipe} from '@angular/common';
import {CartService} from '../../../../services/cart/cart.service';
import {Button} from 'primeng/button';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ProductPriceComponent} from './price/product-price.component';
import {Dialog} from 'primeng/dialog';
import {getDarkIcon, getLightIcon} from '../../../../utils/functions';
import {Product} from '../../../../api/asset';

@Component({
  selector: 'app-product',
  imports: [
    Button,
    ProductPriceComponent,
    Dialog,
    TranslatePipe,
    NgOptimizedImage,
    UpperCasePipe
  ],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent implements OnInit {
  readonly product = input.required<Product>();
  protected productFormat = signal("");
  protected productPrice = signal(0);
  protected dialogVisible = false;
  private translateService = inject(TranslateService);
  protected readonly currentLang = signal(this.translateService.currentLang);
  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.setDefaults(this.product());

    const subscription = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  protected addProductToCart(product: Product) {
    this.cartService.add({
      pseudoId: product.id + this.productFormat(),
      formatCode: this.productFormat(),
      images: {
        dark: getDarkIcon(product.type),
        light: getLightIcon(product.type)
      },
      type: product.type,
      name: product.name,
      description: product.description,
      formats: this.getFormats(product),
      price: this.productPrice(),
      quantity: 1,
    });

    this.dialogVisibility(false);
    this.setDefaults(this.product());
  }

  protected setFormat(format: string) {
    this.productFormat.set(format);
    this.updatePrice(format);
  }

  protected dialogVisibility(value: boolean) {
    if (!value) {
      this.setDefaults(this.product());
    }
    this.dialogVisible = value;
  }

  private updatePrice(format: string) {
    switch (format) {
      case 'S':
        this.productPrice.set(this.product().prices['s']);
        break;
      case 'M':
        this.productPrice.set(this.product().prices['m']);
        break;
      case 'L':
        this.productPrice.set(this.product().prices['l']);
        break;
    }
  }

  private setDefaults(product: Product) {
    this.productFormat.set(product.formats['m'] === undefined ? "S" : "M");
    this.productPrice.set(product.prices['m'] === undefined ? product.prices['s'] : product.prices['m']);
  }

  private getFormats(product: Product): { [key: string]: { [key: string]: string; }; } {
    let format;

    switch (this.productFormat()) {
      case "S": {
        format = {
          's': {
            'en': product.formats['s']['en'],
            'es': product.formats['s']['es'],
          }
        };
        break;
      }
      case "M": {
        format = {
          'm': {
            'en': product.formats['m']['en'],
            'es': product.formats['m']['es'],
          }
        };
      }

        break;
      case "L": {
        format = {
          'l': {
            'en': product.formats['l']['en'],
            'es': product.formats['l']['es'],
          }
        };
      }
        break;
      default:
        format = {
          'm': {
            'en': product.formats['m']['en'],
            'es': product.formats['m']['es'],
          }
        };
    }

    return format;
  }
}

export const productPlaceholder = (): Product => {
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
    id: 1
  };
};
