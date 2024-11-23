import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {ThemeService} from '../../../services/themes/theme.service';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [],
  templateUrl: './theme-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSelectorComponent {
  private themeService = inject(ThemeService);
  isDark = signal(true);

  protected switchTheme(theme: string) {
    if (theme === "aura-light-noir") {
      this.isDark.set(false);
    } else {
      this.isDark.set(true);
    }

    this.themeService.switchTheme(theme);
  }
}
