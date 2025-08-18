import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import {PrimeNG} from 'primeng/config';
import {SsrCookieService} from 'ngx-cookie-service-ssr';
import primeEN from '../../../../public/i18n/primeng-en.json';
import primeES from '../../../../public/i18n/primeng-es.json';
import {LOCALE} from '../../../utils/constants';

@Component({
  selector: 'app-locale-selector',
  imports: [],
  templateUrl: './locale-selector.component.html',
  styleUrls: ['./locale-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocaleSelectorComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly cookieService = inject(SsrCookieService);
  private readonly translateService = inject(TranslateService);
  private readonly messageService = inject(MessageService);
  private readonly primeNgConfig = inject(PrimeNG);
  private readonly currentLang = signal(this.translateService.currentLang);
  protected readonly selectedLang = signal(this.getLanguage());

  ngOnInit() {
    const subscription = this.translateService.onLangChange.subscribe(langEvent => {
      this.currentLang.set(langEvent.lang);
      this.selectedLang.set(this.getLanguage());
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  protected toggleLanguage(): void {
    let lang;

    switch (this.currentLang()) {
      case 'en':
        lang = 'es';
        break;
      case 'es':
        lang = 'en';
        break;
      default:
        lang = 'en';
    }

    this.cookieService.set(LOCALE, lang);
    this.useLanguage(lang);
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

  private getLanguage() {
    let lang: string;

    switch (this.currentLang()) {
      case 'en':
        lang = 'Castellano';
        break;
      case 'es':
        lang = 'English';
        break;
      default:
        lang = 'English';
    }

    return lang;
  }
}
