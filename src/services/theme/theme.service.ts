import {afterNextRender, Injectable, signal} from '@angular/core';
import {COOKIE_THEME_MODE} from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal(false);

  constructor() {
    afterNextRender(() => {
      let darkTheme = localStorage.getItem(COOKIE_THEME_MODE);
      if (darkTheme && darkTheme === 'dark') {
        this.isDarkMode.set(true);
      }
    });
  }

  toggleDarkMode(on: boolean) {
    const element = document.querySelector('html');
    if (on) {
      this.isDarkMode.set(true);
      element!.classList.add('my-app-dark');
      localStorage.setItem(COOKIE_THEME_MODE, 'dark');
    } else {
      this.isDarkMode.set(false);
      element!.classList.remove('my-app-dark');
      localStorage.setItem(COOKIE_THEME_MODE, 'light');
    }
  }

  getDarkMode() {
    return this.isDarkMode.asReadonly();
  }
}
