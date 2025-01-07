import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {LocalstorageService} from '../../../services/localstorage/localstorage.service';
import {ThemeService} from '../../../services/theme/theme.service';

@Component({
  selector: 'app-theme-selector',
  imports: [],
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSelectorComponent {
  private localStorageService = inject(LocalstorageService);
  private themeService = inject(ThemeService);
  isDarkMode = signal(this.localStorageService.getDarkMode());

  toggleDarkMode = (on: boolean) => {
    this.isDarkMode.set(on);
    this.themeService.toggleDarkMode(on);
    this.localStorageService.setDarkMode(on);
  };

  changePrimaryColor(color: string) {
    this.themeService.changePrimaryColor(color);
    this.localStorageService.setTheme(color);
  }
}
