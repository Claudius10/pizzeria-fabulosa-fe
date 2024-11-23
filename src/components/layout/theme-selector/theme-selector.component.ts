import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ThemeService} from '../../../services/themes/theme.service';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [],
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSelectorComponent {
  private themeService = inject(ThemeService);

  protected switchTheme(theme: string) {
    this.themeService.switchTheme(theme);
  }
}
