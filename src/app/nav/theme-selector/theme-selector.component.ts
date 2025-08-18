import {ChangeDetectionStrategy, Component, inject} from '@angular/core';

import {ThemeService} from '../../services/theme/theme.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-theme-selector',
  imports: [
    TranslatePipe
  ],
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSelectorComponent {
  private readonly themeService = inject(ThemeService);
  protected readonly isDarkMode = this.themeService.getDarkMode();

  protected toggleDarkMode = () => {
    this.themeService.toggleDarkMode();
  };
}
