import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {ThemeService} from '../../../services/themes/theme.service';
import {THEMES_DARK, THEMES_DEFAULT, THEMES_LIGHT} from '../../../utils/constants';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [],
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSelectorComponent {
  private themeService = inject(ThemeService);
  protected isDark = signal(true);
  private darkThemes: string[] = THEMES_DARK;
  private lightThemes: string[] = THEMES_LIGHT;
  private currentTheme = THEMES_DEFAULT;
  private index = 0;

  switchTheme() {
    if (this.isDark()) {
      const nextTheme = this.darkThemes[this.index];
      this.themeService.switchTheme(nextTheme);
      this.currentTheme = nextTheme;
    } else {
      const nextTheme = this.lightThemes[this.index];
      this.themeService.switchTheme(nextTheme);
      this.currentTheme = nextTheme;
    }
    this.handleIndex();
  }

  private handleIndex(): void {
    if (this.index === THEMES_DARK.length - 1) {
      this.index = 0;
    } else {
      this.index++;
    }
  }

  toggleDarkMode() {
    let theme;
    if (this.isDark()) {
      theme = this.currentTheme.replace("dark", "light");
    } else {
      theme = this.currentTheme.replace("light", "dark");
    }
    this.isDark.set(!this.isDark());
    this.themeService.switchTheme(theme);
  }
}
