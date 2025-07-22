import {CanMatchFn, Router} from '@angular/router';
import {inject, PLATFORM_ID} from "@angular/core";
import {isPlatformBrowser} from '@angular/common';
import {AUTH} from '../../../utils/constants';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

export const userCredentialsGuardGuard: CanMatchFn = (route, segments) => {
  const platformId = inject(PLATFORM_ID);
  const isServer = !isPlatformBrowser(platformId);

  if (isServer) {
    return true;
  }

  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);

  if (!localStorageService.exists(AUTH)) {
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
