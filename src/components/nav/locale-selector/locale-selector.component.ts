import {ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import {NgClass} from '@angular/common';
import {Button} from 'primeng/button';
import {PrimeNG} from 'primeng/config';
import primeEN from '../../../../public/i18n/primeng-en.json';
import primeES from '../../../../public/i18n/primeng-es.json';
import {SsrCookieService} from 'ngx-cookie-service-ssr';
import {COOKIE_LIFE_30_DAYS, COOKIE_LOCALE, COOKIE_PATH} from '../../../utils/constants';

@Component({
  selector: 'app-locale-selector',
  imports: [
    NgClass,
    Button
  ],
  templateUrl: './locale-selector.component.html',
  styleUrls: ['./locale-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocaleSelectorComponent {
  private cookieService = inject(SsrCookieService);
  private translateService = inject(TranslateService);
  private messageService = inject(MessageService);
  private primeNgConfig = inject(PrimeNG);
  visible = false;
  @ViewChild('locale') locale: ElementRef | undefined;

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (this.locale) {
      if (!this.locale.nativeElement.contains(event.target)) {
        this.visible = false;
      }
    }
  }

  toggle() {
    this.visible = !this.visible;
  }

  changeLanguage(lang: string): void {
    this.cookieService.set(COOKIE_LOCALE, lang, COOKIE_LIFE_30_DAYS, COOKIE_PATH);
    this.useLanguage(lang);
    this.visible = false;
    this.messageService.add({
      severity: 'info',
      summary: lang === 'es' ? 'Información' : 'Information', // can't use this.translateService.instant here, first time calling won't have an effect
      detail: lang === 'es' ? 'Castellano seleccionado' : 'English selected',
      life: 2000
    });
  }

  private useLanguage(language: string): void {
    this.translateService.use(language);
    // setting locale of primeNg by directly loading the json files in this component
    // https://github.com/ngx-translate/core/issues/641
    this.primeNgConfig.setTranslation(language === "en" ? primeEN : primeES);
  }
}
