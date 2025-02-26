import {inject, Injectable, signal} from '@angular/core';
import {updatePreset} from '@primeng/themes';
import {SsrCookieService} from 'ngx-cookie-service-ssr';
import {COOKIE_LIFE_30_DAYS, COOKIE_PATH, COOKIE_THEME_COLOR, COOKIE_THEME_MODE} from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private cookieService = inject(SsrCookieService);
  isDarkMode = signal(false);

  changePrimaryColor(color: string) {
    updatePreset({
      semantic: {
        primary: this.getColorPreset(color),
      }
    });
    this.cookieService.set(COOKIE_THEME_COLOR, color, COOKIE_LIFE_30_DAYS, COOKIE_PATH);
  }

  toggleDarkMode(on: boolean) {
    const element = document.querySelector('html');
    if (on) {
      this.isDarkMode.set(true);
      element!.classList.add('my-app-dark');
      this.cookieService.set(COOKIE_THEME_MODE, "dark", COOKIE_LIFE_30_DAYS, COOKIE_PATH);
    } else {
      this.isDarkMode.set(false);
      element!.classList.remove('my-app-dark');
      this.cookieService.delete(COOKIE_THEME_MODE);
    }
  }

  reload() {
    if (this.cookieService.check(COOKIE_THEME_MODE)) {
      this.toggleDarkMode(true);
    }

    if (this.cookieService.check(COOKIE_THEME_COLOR)) {
      this.changePrimaryColor(this.cookieService.get(COOKIE_THEME_COLOR));
    }
  }

  getColorPreset(color: string) {
    return {
      50: `{${color}.50}`,
      100: `{${color}.100}`,
      200: `{${color}.200}`,
      300: `{${color}.300}`,
      400: `{${color}.400}`,
      500: `{${color}.500}`,
      600: `{${color}.600}`,
      700: `{${color}.700}`,
      800: `{${color}.800}`,
      900: `{${color}.900}`,
      950: `{${color}.950}`
    };
  }

  getDarkMode() {
    return this.isDarkMode.asReadonly();
  }
}
