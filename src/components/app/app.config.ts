import {APP_INITIALIZER, ApplicationConfig, inject, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {AuthService} from '../../services/auth/auth.service';
import {CookieService} from 'ngx-cookie-service';

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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withComponentInputBinding()),
    //provideClientHydration(),
    provideHttpClient(withFetch()),
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
