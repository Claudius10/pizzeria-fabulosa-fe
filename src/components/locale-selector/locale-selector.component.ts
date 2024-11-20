import {ChangeDetectionStrategy, Component} from '@angular/core';
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
  constructor(private translate: TranslateService, private config: PrimeNGConfig) {
  }

  useLanguage(language: string): void {
    this.translate.use(language);

    // setting locale of primeNg by directly loading the json files in this component
    // https://github.com/ngx-translate/core/issues/641
    if (language === 'es') {
      this.config.setTranslation(primeNgEs);
    } else {
      this.config.setTranslation(primeNgEn);
    }
  }
}
