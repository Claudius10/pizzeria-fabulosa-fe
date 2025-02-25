import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavigationBarComponent} from '../../nav/navigation-bar/navigation-bar.component';
import {FooterComponent} from '../../footer/footer.component';
import {ToastModule} from "primeng/toast";
import {ErrorService} from '../../../services/error/error.service';
import {SsrCookieService} from 'ngx-cookie-service-ssr';
import {TranslateService} from '@ngx-translate/core';
import {COOKIE_LOCALE} from '../../../utils/constants';
import es from '../../../../public/i18n/es.json';
import primeES from '../../../../public/i18n/primeng-es.json';
import en from '../../../../public/i18n/en.json';
import {PrimeNG} from 'primeng/config';

@Component({
  selector: 'app-root',
  imports: [
    NavigationBarComponent,
    RouterOutlet,
    FooterComponent,
    ToastModule
  ],
  providers: [ErrorService],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  cookieService = inject(SsrCookieService);
  translateService = inject(TranslateService);
  primeNgConfig = inject(PrimeNG);

  ngOnInit(): void {


    if (this.cookieService.check(COOKIE_LOCALE)) {
      const locale = this.cookieService.get(COOKIE_LOCALE);
      if (locale !== 'en') {
        this.translateService.setTranslation('es', es);
        this.translateService.use(locale);
        this.primeNgConfig.setTranslation(primeES);
      } else {
        this.translateService.setTranslation('en', en);
        this.translateService.setDefaultLang('en');
      }
    } else {
      this.translateService.setTranslation('en', en);
      this.translateService.setDefaultLang('en');
    }
  }
}
