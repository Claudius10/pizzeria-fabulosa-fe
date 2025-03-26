import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding, withInMemoryScrolling} from '@angular/router';
import {routes} from '../routes/app.routes';
import {HttpClient, provideHttpClient, withFetch} from '@angular/common/http';
import {AuthService} from '../../services/auth/auth.service';
import {provideTanStackQuery, QueryClient} from '@tanstack/angular-query-experimental';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideTranslateService, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ConfirmationService, MessageService} from 'primeng/api';
import {IMAGE_CONFIG} from '@angular/common';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {PrimeNG, providePrimeNG} from 'primeng/config';
import {defaultPreset} from '../../primeng/default.preset.theme';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {COOKIE_CART, COOKIE_ID_TOKEN, COOKIE_LOCALE} from '../../utils/constants';
import {CartService} from '../../services/cart/cart.service';
import {SsrCookieService} from 'ngx-cookie-service-ssr';
import primeES from "../../../public/i18n/primeng-es.json";
import primeEN from "../../../public/i18n/primeng-es.json";
import en from "../../../public/i18n/en.json";
import es from "../../../public/i18n/es.json";

function initializeApp(
  cookieService: SsrCookieService,
  authService: AuthService,
  translateService: TranslateService,
  cartService: CartService,
  primeNgConfig: PrimeNG
) {
  return () => new Promise((resolve) => {
    // set translations to have them available when calling translateService.translations
    translateService.setTranslation('en', en);
    translateService.setTranslation('es', es);

    // fallback translation
    translateService.setDefaultLang('en');

    // locale
    if (!cookieService.check(COOKIE_LOCALE)) {
      translateService.use('en');
    } else {
      const locale = cookieService.get(COOKIE_LOCALE);
      translateService.use(locale);
      primeNgConfig.setTranslation(locale === 'en' ? primeEN : primeES);
    }

    // auth token
    if (cookieService.check(COOKIE_ID_TOKEN)) {
      authService.authenticate(cookieService.get(COOKIE_ID_TOKEN));
    }

    // cart
    if (cookieService.check(COOKIE_CART)) {
      const cartCookie = cartService.getCartCookie();
      if (cartCookie.items.length > 0) {
        cartService.set(cartCookie.items, cartCookie.quantity, cartCookie.total);
      }
    }

    resolve(true);
  });
}

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

export const configApp: ApplicationConfig = {
  providers: [
    MessageService,
    ConfirmationService,
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: defaultPreset,
        options: {
          darkModeSelector: '.my-app-dark'
        }
      }
    }),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({scrollPositionRestoration: "enabled"})),
    provideHttpClient(withFetch()),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    provideTanStackQuery(new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnMount: true,
          staleTime: 300000
        },
      }
    })), // withDevtools()
    provideAppInitializer(() => {
      const initializerFn = (() => {
        const cookieService = inject(SsrCookieService);
        const authService = inject(AuthService);
        const translateService = inject(TranslateService);
        const cartService = inject(CartService);
        const primeNgConfig = inject(PrimeNG);
        return initializeApp(
          cookieService,
          authService,
          translateService,
          cartService,
          primeNgConfig,
        );
      })();
      return initializerFn();
    }),
    {provide: IMAGE_CONFIG, useValue: {disableImageSizeWarning: true, disableImageLazyLoadWarning: true}}
  ]
};
