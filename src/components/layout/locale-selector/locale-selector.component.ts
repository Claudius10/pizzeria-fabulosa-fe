import {ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import primeNgEs from "../../../../public/i18n/primeng-es.json";
import primeNgEn from "../../../../public/i18n/primeng-en.json";
import {ToastModule} from 'primeng/toast';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-locale-selector',
  standalone: true,
  imports: [
    ToastModule,
    NgClass
  ],
  providers: [MessageService],
  templateUrl: './locale-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocaleSelectorComponent {
  private translateService = inject(TranslateService);
  private primeNgConfig = inject(PrimeNGConfig);
  private messageService = inject(MessageService);
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

  spanish() {
    this.useLanguage('es');
    this.visible = false;
    this.messageService.add({
      severity: 'info',
      summary: 'Información',
      detail: 'Usted seleccionó Español',
      life: 2000
    });
  }

  english() {
    this.useLanguage('en');
    this.visible = false;
    this.messageService.add({
      severity: 'info',
      summary: 'Information',
      detail: 'You selected English',
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
