import {Injectable, signal} from '@angular/core';
import {updatePreset} from '@primeng/themes';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal(false);

  changePrimaryColor(color: string) {
    updatePreset({
      semantic: {
        primary: this.getColorPreset(color),
      }
    });
  }

  toggleDarkMode(on: boolean) {
    const element = document.querySelector('html');
    if (on) {
      this.isDarkMode.set(true);
      element!.classList.add('my-app-dark');
    } else {
      this.isDarkMode.set(false);
      element!.classList.remove('my-app-dark');
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
