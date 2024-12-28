import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavigationBarComponent} from '../../nav/navigation-bar/navigation-bar.component';
import {FooterComponent} from '../../footer/footer.component';
import {TranslateService} from '@ngx-translate/core';
import en from "../../../../public/i18n/en.json";
import es from "../../../../public/i18n/es.json";
import {LocalstorageService} from '../../../services/localstorage/localstorage.service';
import {CartService} from '../../../services/cart/cart.service';
import {ToastModule} from "primeng/toast";
import {ErrorService} from '../../../services/error/error.service';
import {ThemeService} from '../../../services/themes/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavigationBarComponent,
    RouterOutlet,
    FooterComponent,
    ToastModule
  ],
  providers: [ErrorService],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private translateService = inject(TranslateService);
  private themeService = inject(ThemeService);
  private localStorageService = inject(LocalstorageService);
  private cartService = inject(CartService);

  ngOnInit() {
    this.setUpLocale();
    this.setUpTheme();
    this.setUpCart();
  }

  setUpTheme() {
    const theme = this.localStorageService.getStorageTheme();
    if (theme === null) {
      return;
    }
    this.themeService.switchTheme(theme);
  }

  setUpCart() {
    if (!this.localStorageService.isCartEmpty()) {
      const {items, total, quantity} = this.localStorageService.getCart();
      this.cartService.set(items, quantity, total, false);
    }
  }

  setUpLocale() {
    const locale = this.localStorageService.getLocale();
    const langToUse = locale === "en" ? en : es;
    this.translateService.addLangs(['es', 'en', 'primeng-es', 'primeng-en']);
    this.translateService.setTranslation(locale, langToUse);
    this.translateService.use(locale);
  }
}
