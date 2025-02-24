import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding, withInMemoryScrolling} from '@angular/router';
import {routes} from './app.routes';
import {HttpClient, provideHttpClient, withFetch} from '@angular/common/http';
import {AuthService} from '../../services/auth/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {provideTanStackQuery, QueryClient} from '@tanstack/angular-query-experimental';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideTranslateService, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ConfirmationService, MessageService} from 'primeng/api';
import {IMAGE_CONFIG} from '@angular/common';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {defaultPreset} from '../../primeng/default.preset.theme';
import {provideClientHydration, withI18nSupport} from '@angular/platform-browser';

function initializeApp(cookieService: CookieService, authService: AuthService) {
  return () => new Promise((resolve) => {

    // authentication check
    const isAuthenticated = cookieService.check("idToken");

    if (isAuthenticated) {
      authService.setUserCredentials(cookieService.get("idToken"));
    }

    // resolve
    resolve(true);
  });
}

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    ConfirmationService,
    provideClientHydration(withI18nSupport()),
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
      defaultLanguage: 'en',
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
        const cookieService = inject(CookieService);
        const authService = inject(AuthService);
        return initializeApp(cookieService, authService);
      })();
      return initializerFn();
    }),
    {provide: IMAGE_CONFIG, useValue: {disableImageSizeWarning: true, disableImageLazyLoadWarning: true}}
  ]
};
