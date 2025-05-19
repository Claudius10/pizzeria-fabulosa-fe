import {afterNextRender, ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavigationBarComponent} from '../../components/nav/navigation-bar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {ToastModule} from "primeng/toast";
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../../services/auth/auth.service';
import {CartService} from '../../services/cart/cart.service';
import {PrimeNG} from 'primeng/config';
import {SsrCookieService} from 'ngx-cookie-service-ssr';
import {COOKIE_ID_TOKEN, LOCALE} from '../../utils/constants';
import en from '../../../public/i18n/en.json';
import es from '../../../public/i18n/es.json';
import primeES from "../../../public/i18n/primeng-es.json";
import primeEN from "../../../public/i18n/primeng-en.json";
import {MessageService} from 'primeng/api';
import {ErrorService} from '../../services/error/error.service';
import {MyCartItemDTO} from '../../utils/interfaces/MyCartItemDTO';

@Component({
  selector: 'app-root',
  imports: [
    NavigationBarComponent,
    RouterOutlet,
    FooterComponent,
    ToastModule
  ],
  providers: [MessageService, ErrorService],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private translateService = inject(TranslateService);
  private cookieService = inject(SsrCookieService);
  private primeNgConfig = inject(PrimeNG);
  private authService = inject(AuthService);
  private cartService = inject(CartService);

  ngOnInit(): void {
    this.initAuth();
    this.initLanguage();
  }

  constructor() {
    afterNextRender(() => {
      this.initCart();
    });
  }

  private initAuth() {
    if (this.cookieService.check(COOKIE_ID_TOKEN)) {
      this.authService.authenticate(this.cookieService.get(COOKIE_ID_TOKEN));
    }
  }

  private initLanguage() {
    // set translations to have them available when calling translateService.translations on first call
    this.translateService.setTranslation('en', en);
    this.translateService.setTranslation('es', es);

    // fallback language
    this.translateService.setDefaultLang('en');

    // locale
    if (!this.cookieService.check(LOCALE)) {
      this.translateService.use('en');
      this.primeNgConfig.setTranslation(primeEN);
    } else {
      const locale = this.cookieService.get(LOCALE);
      this.translateService.use(locale);
      switch (locale) {
        case 'en':
          this.primeNgConfig.setTranslation(primeEN);
          break;
        case 'es':
          this.primeNgConfig.setTranslation(primeES);
          break;
        default:
          this.primeNgConfig.setTranslation(primeEN);
      }
    }
  }

  private initCart() {
    const cart = this.cartService.getCart();
    if (cart) {
      const cartItems = cart.items as MyCartItemDTO[];
      this.cartService.set(cartItems, cart.quantity, cart.total);
    }
  }
}
