import {ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, ViewChild} from '@angular/core';

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
  visible = false;
  @ViewChild('themes') themes: ElementRef | undefined;

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (this.themes) {
      if (!this.themes.nativeElement.contains(event.target)) {
        this.visible = false;
      }
    }
  }

  toggle() {
    this.visible = !this.visible;
  }

  toggleDarkMode = (on: boolean) => {
    this.themeService.toggleDarkMode(on);
  };

  changePrimaryColor(color: string) {
    this.themeService.changePrimaryColor(color);
  }
}
