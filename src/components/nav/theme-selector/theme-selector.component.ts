import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {ThemeService} from '../../../services/themes/theme.service';
import {THEMES_DARK, THEMES_LIGHT} from '../../../utils/constants';
import {LocalstorageService} from '../../../services/localstorage/localstorage.service';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [],
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSelectorComponent {
  private darkThemes: string[] = THEMES_DARK;
  private lightThemes: string[] = THEMES_LIGHT;
  private themeService = inject(ThemeService);
  private localStorageService = inject(LocalstorageService);
  private currentTheme = this.localStorageService.getTheme();
  isDark = signal(this.localStorageService.getTheme().includes("dark"));

  toggleDarkMode() {
    let nextTheme;

    if (this.currentTheme.includes("dark")) {
      nextTheme = this.currentTheme.replace("dark", "light");
      this.isDark.set(false);
    } else {
      nextTheme = this.currentTheme.replace("light", "dark");
      this.isDark.set(true);
    }

    this.themeService.switchTheme(nextTheme);
    this.currentTheme = nextTheme;
  }

  switchTheme() {
    const storageIndex = this.getStoreIndex();

    let index;
    if (storageIndex >= this.darkThemes.length - 1) {
      index = 0;
    } else {
      index = storageIndex + 1;
    }

    if (this.currentTheme.includes("dark")) {
      const nextTheme = this.darkThemes[index];
      this.themeService.switchTheme(nextTheme);
      this.currentTheme = nextTheme;
    } else {
      const nextTheme = this.lightThemes[index];
      this.themeService.switchTheme(nextTheme);
      this.currentTheme = nextTheme;
    }
  }

  getStoreIndex() {
    let storageIndex;
    if (THEMES_LIGHT.findIndex(theme => theme === this.localStorageService.getTheme()) === -1) {
      storageIndex = THEMES_DARK.findIndex(theme => theme === this.localStorageService.getTheme());
    } else {
      storageIndex = THEMES_LIGHT.findIndex(theme => theme === this.localStorageService.getTheme());
    }
    return storageIndex;
  }
}
