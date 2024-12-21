import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {CartService} from '../../../../services/cart/cart.service';
import {Button} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {ProductDTO} from '../../../../interfaces/dto/resources';
import {TranslateService} from '@ngx-translate/core';
import {ProductPriceComponent} from './price/product-price.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgOptimizedImage,
    Button,
    CardModule,
    PanelModule,
    NgClass,
    ProductPriceComponent
  ],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
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

  public addProductToCart() {
    this.cartService.add({
      id: this.product().id.toString() + this.productPrice().toString() + this.productFormat(),
      name: this.currentLang() === 'en' ? this.product().name.en : this.product().name.es,
      format: this.getFormat(this.productFormat()),
      price: this.productPrice(),
      productType: this.product().productType,
      image: this.product().image,
      quantity: 1,
    });
  }

  getFormat(format: string) {
    switch (format) {
      case 's':
        return this.currentLang() === 'en' ? this.product().format.s.en : this.product().format.s.es;
      case 'm':
        return this.currentLang() === 'en' ? this.product().format.m.en : this.product().format.m.es;
      case 'l':
        return this.currentLang() === 'en' ? this.product().format.l.en : this.product().format.l.es;
      default:
        return '';
    }
  }

  updatePrice(format: string) {
    switch (format) {
      case 's':
        this.productPrice.set(this.product().price.s);
        break;
      case 'm':
        this.productPrice.set(this.product().price.m);
        break;
      case 'l':
        this.productPrice.set(this.product().price.l);
        break;
    }
  }

  setFormat(format: string) {
    this.productFormat.set(format);
    this.updatePrice(format);
  }

  ngOnInit(): void {
    this.productFormat.set(this.product().format.m === undefined ? "s" : "m");
    this.productPrice.set(this.product().price.m === undefined ? this.product().price.s : this.product().price.m);

    const subscription = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
