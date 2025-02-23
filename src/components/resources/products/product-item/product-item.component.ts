import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {NgClass, UpperCasePipe} from '@angular/common';
import {CartService} from '../../../../services/cart/cart.service';
import {Button} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {ProductDTO} from '../../../../interfaces/dto/resources';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ProductPriceComponent} from './price/product-price.component';
import {Dialog} from 'primeng/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {v4 as uuidv4} from 'uuid';
import {getDarkIcon, getLightIcon} from '../../../../utils/functions';

@Component({
  selector: 'app-product',
  imports: [
    Button,
    PanelModule,
    NgClass,
    ProductPriceComponent,
    ReactiveFormsModule,
    TranslatePipe,
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
      images: {
        dark: getDarkIcon(this.product().type),
        light: getLightIcon(this.product().type)
      },
      type: this.product().type,
      name: this.product().name,
      description: this.product().description,
      formats: {
        s: this.productFormat() === "S" ? {
          en: this.product().formats.s.en,
          es: this.product().formats.s.es,
        } : null,
        m: this.productFormat() === "M" ? {
          en: this.product().formats.m.en,
          es: this.product().formats.m.es,
        } : null,
        l: this.productFormat() === "L" ? {
          en: this.product().formats.l.en,
          es: this.product().formats.l.es,
        } : null,
      },
      price: this.productPrice(),
      quantity: 1,
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

  openAllergensDialog() {
    this.allergensDialogVisible = true;
  }

  closeAllergensDialog() {
    this.allergensDialogVisible = false;
  }
}
