import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {routes} from './app.routes';
import {HttpClient, provideHttpClient, withFetch} from '@angular/common/http';
import {AuthService} from '../../services/auth/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {provideTanStackQuery, QueryClient, withDevtools} from '@tanstack/angular-query-experimental';
import {provideAnimations} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

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
    //provideClientHydration(),
    provideAnimations(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withComponentInputBinding()),
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
      }),
      withDevtools()),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const cookieService = inject(CookieService);
        const authService = inject(AuthService);
        return initializeApp(cookieService, authService);
      },
      multi: true,
    }
  ]
};
