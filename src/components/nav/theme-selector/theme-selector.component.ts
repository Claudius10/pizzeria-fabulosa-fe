import {ChangeDetectionStrategy, Component, inject} from '@angular/core';

import {ThemeService} from '../../../services/theme/theme.service';

@Component({
  selector: 'app-theme-selector',
  imports: [],
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSelectorComponent {
  private themeService = inject(ThemeService);
  isDarkMode = this.themeService.getDarkMode();

  toggleDarkMode = (on: boolean) => {
    this.themeService.toggleDarkMode(on);
  };
}
