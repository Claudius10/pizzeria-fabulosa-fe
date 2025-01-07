import {Injectable} from '@angular/core';
import {updatePreset} from '@primeng/themes';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

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
      element!.classList.add('my-app-dark');
    } else {
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
}
