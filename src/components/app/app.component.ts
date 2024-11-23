import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavigationBarComponent} from '../layout/navigation/navigation-bar/navigation-bar.component';
import {FooterComponent} from '../layout/footer/footer.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import defaultLanguage from "../../../public/i18n/en.json";

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
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'PizzeriaAngularFE';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['es', 'en', 'primeng-es', 'primeng-en']);
    this.translate.setTranslation('en', defaultLanguage);
    this.translate.setDefaultLang('en');
  }
}
