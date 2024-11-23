import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavigationBarComponent} from '../../layout/navigation/navigation-bar/navigation-bar.component';
import {FooterComponent} from '../../layout/footer/footer.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import defaultLanguage from "../../../../public/i18n/en.json";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavigationBarComponent,
    RouterOutlet,
    FooterComponent,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private translateService = inject(TranslateService);

  ngOnInit() {
    this.translateService.addLangs(['es', 'en', 'primeng-es', 'primeng-en']);
    this.translateService.setTranslation('en', defaultLanguage);
    this.translateService.use('en');
  }
}
