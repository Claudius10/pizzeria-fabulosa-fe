import {afterNextRender, inject, Injectable, signal} from '@angular/core';
import {THEME_MODE} from '../../../utils/constants';
import {LocalStorageService} from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private localStorageService = inject(LocalStorageService);
  isDarkMode = signal(false);

  constructor() {
    afterNextRender(() => {
      const darkTheme = this.localStorageService.get(THEME_MODE);
      if (darkTheme && darkTheme === 'dark') {
        this.isDarkMode.set(true);
      }
    });
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    const theme = this.localStorageService.get(THEME_MODE);
    if (theme && theme === 'light') {
      this.isDarkMode.set(true);
      element!.classList.add('my-app-dark');
      this.localStorageService.add(THEME_MODE, 'dark');
    } else {
      this.isDarkMode.set(false);
      element!.classList.remove('my-app-dark');
      this.localStorageService.add(THEME_MODE, 'light');
    }
  }

  getDarkMode() {
    return this.isDarkMode.asReadonly();
  }
}
