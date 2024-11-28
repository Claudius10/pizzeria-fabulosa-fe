import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavigationBarComponent} from '../../layout/navigation/navigation-bar/navigation-bar.component';
import {FooterComponent} from '../../layout/footer/footer.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import defaultLanguage from "../../../../public/i18n/en.json";
import {CartLocalstorageService} from '../../../services/cart/localstorage/cart-localstorage.service';
import {CartService} from '../../../services/cart/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavigationBarComponent,
    RouterOutlet,
    FooterComponent,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private translateService = inject(TranslateService);
  private cartLocalStorageService = inject(CartLocalstorageService);
  private cartService = inject(CartService);

  ngOnInit() {
    this.translateService.addLangs(['es', 'en', 'primeng-es', 'primeng-en']);
    this.translateService.setTranslation('en', defaultLanguage);
    this.translateService.use('en');

    if (!this.cartLocalStorageService.isEmpty()) {
      const {items, total, quantity} = this.cartLocalStorageService.get();
      this.cartService.set(items, quantity, total);
    }
  }
}
