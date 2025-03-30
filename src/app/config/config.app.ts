import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding, withInMemoryScrolling} from '@angular/router';
import {routes} from '../routes/app.routes';
import {HttpClient, provideHttpClient, withFetch} from '@angular/common/http';
import {provideTanStackQuery, QueryClient} from '@tanstack/angular-query-experimental';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideTranslateService, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ConfirmationService, MessageService} from 'primeng/api';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {defaultPreset} from '../../primeng/default.preset.theme';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';

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
    // {provide: IMAGE_CONFIG, useValue: {disableImageSizeWarning: true, disableImageLazyLoadWarning: true}}
  ]
};
