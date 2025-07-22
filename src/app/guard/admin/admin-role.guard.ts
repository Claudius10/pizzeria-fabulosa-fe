import {CanMatchFn, Router} from '@angular/router';
import {inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {ADMIN, ADMIN_MODE, AUTH} from '../../../utils/constants';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

export const adminRoleGuard: CanMatchFn = (route, segments) => {
  const platformId = inject(PLATFORM_ID);
  const isServer = !isPlatformBrowser(platformId);

  if (isServer) {
    return true;
  }

  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);

  if (!localStorageService.exists(AUTH) || !localStorageService.exists(ADMIN) || !localStorageService.exists(ADMIN_MODE)) {
    return router.parseUrl("/forbidden");
  }

  if (segments.length === 1 && segments[0].path === "admin") {
    return router.parseUrl("/admin/dashboard");
  }

  if (segments.length > 1 && segments[0].path === "admin") {
    return true;
  }

  return router.parseUrl("/404");
};
