import {inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {LocalstorageService} from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document: Document = inject(DOCUMENT);
  private localStorageService = inject(LocalstorageService);

  public switchTheme(theme: string) {
    let appTheme = this.document.getElementById("app-theme") as HTMLLinkElement;
    this.localStorageService.setTheme(theme);
    if (appTheme) {
      appTheme.href = `${theme}.css`;
    }
  }
}
