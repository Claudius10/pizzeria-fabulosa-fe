import {CanMatchFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../../services/auth/auth.service";

export const userCredentialsGuardGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const authService = inject(AuthService);

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
