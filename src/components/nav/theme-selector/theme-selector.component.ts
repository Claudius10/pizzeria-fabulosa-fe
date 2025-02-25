import {ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, ViewChild} from '@angular/core';

import {ThemeService} from '../../../services/theme/theme.service';
import {NgClass} from '@angular/common';
import {SsrCookieService} from 'ngx-cookie-service-ssr';
import {COOKIE_THEME_MODE} from '../../../utils/constants';

@Component({
  selector: 'app-theme-selector',
  imports: [
    NgClass
  ],
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSelectorComponent {

  private cookieService = inject(SsrCookieService);
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
    if (on) {
      this.cookieService.set(COOKIE_THEME_MODE, "dark", 30);
    } else {
      this.cookieService.delete(COOKIE_THEME_MODE);
    }
  };

  changePrimaryColor(color: string) {
    this.themeService.changePrimaryColor(color);
  }
}
