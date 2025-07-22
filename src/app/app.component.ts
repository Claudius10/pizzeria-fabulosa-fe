import {afterNextRender, ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {BaseNavigationBarComponent} from './nav/bar/base-navigation-bar.component';
import {FooterComponent} from './footer/footer.component';
import {ToastModule} from "primeng/toast";
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {CartService} from './services/cart/cart.service';
import {PrimeNG} from 'primeng/config';
import {SsrCookieService} from 'ngx-cookie-service-ssr';
import {LOCALE} from '../utils/constants';
import en from '../../public/i18n/en.json';
import es from '../../public/i18n/es.json';
import primeES from "../../public/i18n/primeng-es.json";
import primeEN from "../../public/i18n/primeng-en.json";
import {MessageService} from 'primeng/api';
import {ErrorService} from './services/error/error.service';
import {MyCartItemDTO} from '../utils/interfaces/MyCartItemDTO';
import {UserinfoComponent} from './util/userinfo/userinfo.component';
import {CartComponent} from './cart/cart.component';
import {Drawer} from 'primeng/drawer';
import {RenderService} from './services/ui/render.service';
import {toObservable} from '@angular/core/rxjs-interop';
import {LogoutDialogComponent} from './nav/logout/logout-dialog.component';
import {LoginDialogComponent} from './nav/login/login-dialog.component';

@Component({
  selector: 'app-root',
  imports: [
    BaseNavigationBarComponent,
    RouterOutlet,
    FooterComponent,
    ToastModule,
    UserinfoComponent,
    CartComponent,
    Drawer,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    LogoutDialogComponent,
    LoginDialogComponent
  ],
  providers: [MessageService, ErrorService],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private readonly translateService = inject(TranslateService);
  private readonly cookieService = inject(SsrCookieService);
  private readonly primeNgConfig = inject(PrimeNG);
  private readonly cartService = inject(CartService);
  private readonly renderService = inject(RenderService);
  protected readonly loginState = this.renderService.getLogin();
  protected readonly logoutState = this.renderService.getLogout();
  private readonly cartState = toObservable(this.renderService.getCartDrawer());
  private readonly routesState = toObservable(this.renderService.getRoutesDrawer());
  protected routesDrawerState = false;
  protected cartDrawerState = false;

  constructor() {
    afterNextRender(() => {
      this.initCart();
    });
  }

  ngOnInit(): void {
    this.cartState.subscribe(state => {
      this.cartDrawerState = state;
    });

    this.routesState.subscribe(state => {
      this.routesDrawerState = state;
    });

    this.initLanguage();
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

  hideRoutesDrawer() {
    this.renderService.switchRoutesDrawer(false);
  }

  hideCartDrawer() {
    this.renderService.switchCartDrawer(false);
  }
}
