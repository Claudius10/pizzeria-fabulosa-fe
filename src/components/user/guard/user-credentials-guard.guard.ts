import {CanMatchFn, Router} from '@angular/router';
import {inject, PLATFORM_ID} from "@angular/core";
import {AuthService} from "../../../services/auth/auth.service";
import {isPlatformBrowser} from '@angular/common';
import {SsrCookieService} from 'ngx-cookie-service-ssr';

export const userCredentialsGuardGuard: CanMatchFn = (route, segments) => {
  const platformId = inject(PLATFORM_ID);
  const isServer = !isPlatformBrowser(platformId);
  const router = inject(Router);
  const authService = inject(AuthService);
  const cookieService = inject(SsrCookieService);

  if (isServer) {
    const idToken = cookieService.get("idToken");
    console.log(idToken);
    return true;
  }

  if (!authService.isAuthenticated()) {
    return router.parseUrl("/forbidden");
  }

  if (segments.length === 1 && segments[0].path === "user") {
    return router.parseUrl("/user/profile");
  }

  if (segments.length > 1 && segments[0].path === "user") {
    return true;
  }

  return router.parseUrl("/404");
};
