import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {LocalstorageService} from '../../../services/localstorage/localstorage.service';
import {updatePreset} from '@primeng/themes';

@Component({
  selector: 'app-theme-selector',
  imports: [],
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSelectorComponent {
  private localStorageService = inject(LocalstorageService);
  private currentTheme = this.localStorageService.getTheme();
  isDark = signal(this.localStorageService.getTheme().includes("dark"));

  toggleDarkMode() {
    const element = document.querySelector('html');
    element!.classList.toggle('my-app-dark');
  }

  changePrimaryColor(color: string) {
    switch (color) {
      case 'indigo':
        updatePreset({
          semantic: {
            primary: indigo()
          }
        });
        break;
      case 'pink':
        updatePreset({
          semantic: {
            primary: pink()
          }
        });
        break;
    }
  }
}

const pink = () => {
  return {
    50: '{pink.50}',
    100: '{pink.100}',
    200: '{pink.200}',
    300: '{pink.300}',
    400: '{pink.400}',
    500: '{pink.500}',
    600: '{pink.600}',
    700: '{pink.700}',
    800: '{pink.800}',
    900: '{pink.900}',
    950: '{pink.950}'
  };
};

const indigo = () => {
  return {
    50: '{indigo.50}',
    100: '{indigo.100}',
    200: '{indigo.200}',
    300: '{indigo.300}',
    400: '{indigo.400}',
    500: '{indigo.500}',
    600: '{indigo.600}',
    700: '{indigo.700}',
    800: '{indigo.800}',
    900: '{indigo.900}',
    950: '{indigo.950}'
  };
};
