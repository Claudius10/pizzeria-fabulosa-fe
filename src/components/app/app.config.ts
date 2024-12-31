import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter, withComponentInputBinding, withInMemoryScrolling} from '@angular/router';
import {routes} from './app.routes';
import {HttpClient, provideHttpClient, withFetch} from '@angular/common/http';
import {AuthService} from '../../services/auth/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {provideTanStackQuery, QueryClient} from '@tanstack/angular-query-experimental';
import {provideAnimations} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ConfirmationService, MessageService} from 'primeng/api';
import {IMAGE_CONFIG} from '@angular/common';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {definePreset} from '@primeng/themes';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}'
    }
  }
});

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
    //provideClientHydration(),
    provideAnimations(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: '.my-app-dark'
        }
      }
    }),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({scrollPositionRestoration: "enabled"})),
    provideHttpClient(withFetch()),
    importProvidersFrom([TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    })]),
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
