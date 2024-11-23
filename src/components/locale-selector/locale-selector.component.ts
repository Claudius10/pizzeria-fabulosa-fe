import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {PrimeNGConfig} from 'primeng/api';
import primeNgEs from "../../../public/i18n/primeng-es.json";
import primeNgEn from "../../../public/i18n/primeng-en.json";

@Component({
  selector: 'app-locale-selector',
  standalone: true,
  imports: [],
  templateUrl: './locale-selector.component.html',
  styleUrl: './locale-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocaleSelectorComponent {
  private translateService = inject(TranslateService);
  private primeNgConfig = inject(PrimeNGConfig);

  useLanguage(language: string): void {
    this.translateService.use(language);
    // setting locale of primeNg by directly loading the json files in this component
    // https://github.com/ngx-translate/core/issues/641
    if (language === 'es') {
      this.primeNgConfig.setTranslation(primeNgEs);
    } else {
      this.primeNgConfig.setTranslation(primeNgEn);
    }
  }
}
