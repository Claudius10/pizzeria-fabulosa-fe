import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MenuItem, MessageService, PrimeNGConfig} from 'primeng/api';
import primeNgEs from "../../../../public/i18n/primeng-es.json";
import primeNgEn from "../../../../public/i18n/primeng-en.json";
import {ToastModule} from 'primeng/toast';
import {MenuModule} from 'primeng/menu';

@Component({
  selector: 'app-locale-selector',
  standalone: true,
  imports: [
    ToastModule,
    MenuModule
  ],
  providers: [MessageService],
  templateUrl: './locale-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocaleSelectorComponent implements OnInit {
  private translateService = inject(TranslateService);
  private primeNgConfig = inject(PrimeNGConfig);
  private messageService = inject(MessageService);

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Español',
        command: () => {
          this.spanish();
        }
      },
      {
        label: 'English',
        command: () => {
          this.english();
        }
      }
    ];
  }

  spanish() {
    this.useLanguage('es');
    this.messageService.add({
      severity: 'info',
      summary: 'Información',
      detail: 'El idioma seleccionado es Español',
      life: 2000
    });
  }

  english() {
    this.useLanguage('en');
    this.messageService.add({
      severity: 'info',
      summary: 'Information',
      detail: 'The selected language is English',
      life: 2000
    });
  }

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
