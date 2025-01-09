import {ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, signal, ViewChild} from '@angular/core';
import {LocalstorageService} from '../../../services/localstorage/localstorage.service';
import {ThemeService} from '../../../services/theme/theme.service';
import {NgClass} from '@angular/common';

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
  private localStorageService = inject(LocalstorageService);
  private themeService = inject(ThemeService);
  isDarkMode = signal(this.localStorageService.getDarkMode());
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
    this.isDarkMode.set(on);
    this.themeService.toggleDarkMode(on);
    this.localStorageService.setDarkMode(on);
  };

  changePrimaryColor(color: string) {
    this.themeService.changePrimaryColor(color);
    this.localStorageService.setTheme(color);
  }
}
