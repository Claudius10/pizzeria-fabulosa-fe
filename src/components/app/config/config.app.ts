import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding, withInMemoryScrolling} from '@angular/router';
import {routes} from '../routes/app.routes';
import {HttpClient, provideHttpClient, withFetch} from '@angular/common/http';
import {AuthService} from '../../../services/auth/auth.service';
import {provideTanStackQuery, QueryClient} from '@tanstack/angular-query-experimental';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideTranslateService, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ConfirmationService, MessageService} from 'primeng/api';
import {IMAGE_CONFIG} from '@angular/common';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {PrimeNG, providePrimeNG} from 'primeng/config';
import {defaultPreset} from '../../../primeng/default.preset.theme';
import {provideClientHydration} from '@angular/platform-browser';
import {COOKIE_CART, COOKIE_ID_TOKEN, COOKIE_LOCALE, COOKIE_THEME_MODE} from '../../../utils/constants';
import {ThemeService} from '../../../services/theme/theme.service';
import {CartService} from '../../../services/cart/cart.service';
import {SsrCookieService} from 'ngx-cookie-service-ssr';
import en from "../../../../public/i18n/en.json";
import es from "../../../../public/i18n/es.json";
import primeES from "../../../../public/i18n/primeng-es.json";

function initializeApp(
  cookieService: SsrCookieService,
  authService: AuthService,
  translateService: TranslateService,
  themeService: ThemeService,
  cartService: CartService,
  primeNgConfig: PrimeNG
) {
  return () => new Promise((resolve) => {
    // auth token
    if (cookieService.check(COOKIE_ID_TOKEN)) {
      authService.setUserCredentials(cookieService.get(COOKIE_ID_TOKEN));
    }

    // translate Service
    translateService.setTranslation('en', en);
    translateService.setDefaultLang('en');

    // locale
    if (cookieService.check(COOKIE_LOCALE)) {
      const locale = cookieService.get(COOKIE_LOCALE);
      if (locale !== 'en') {
        translateService.setTranslation('es', es);
        translateService.use(locale);
        primeNgConfig.setTranslation(primeES);
      }
    }

    // theme
    if (cookieService.check(COOKIE_THEME_MODE)) {
      //???
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
    provideClientHydration(),
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
        const themeService = inject(ThemeService);
        const cartService = inject(CartService);
        const primeNgConfig = inject(PrimeNG);
        return initializeApp(
          cookieService,
          authService,
          translateService,
          themeService,
          cartService,
          primeNgConfig,
        );
      })();
      return initializerFn();
    }),
    {provide: IMAGE_CONFIG, useValue: {disableImageSizeWarning: true, disableImageLazyLoadWarning: true}}
  ]
};
