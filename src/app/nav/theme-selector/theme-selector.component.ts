import {ChangeDetectionStrategy, Component, inject} from '@angular/core';

import {ThemeService} from '../../services/theme/theme.service';

@Component({
  selector: 'app-theme-selector',
  imports: [],
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSelectorComponent {
  private themeService = inject(ThemeService);
  protected isDarkMode = this.themeService.getDarkMode();

  protected toggleDarkMode = () => {
    this.themeService.toggleDarkMode();
  };
}
