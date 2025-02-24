import {afterNextRender, ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavigationBarComponent} from '../../nav/navigation-bar/navigation-bar.component';
import {FooterComponent} from '../../footer/footer.component';
import {TranslateService} from '@ngx-translate/core';
import {LocalstorageService} from '../../../services/localstorage/localstorage.service';
import {CartService} from '../../../services/cart/cart.service';
import {ToastModule} from "primeng/toast";
import {ErrorService} from '../../../services/error/error.service';
import {ThemeService} from '../../../services/theme/theme.service';
import {PrimeNG} from 'primeng/config';
import primeES from "../../../../public/i18n/primeng-es.json";
import es from "../../../../public/i18n/es.json";

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
export class AppComponent {
  private translateService = inject(TranslateService);
  private localStorageService = inject(LocalstorageService);
  private themeService = inject(ThemeService);
  private cartService = inject(CartService);
  private primeNgConfig = inject(PrimeNG);

  constructor() {
    afterNextRender({
      write: () => {
        this.setUpLocale();
        this.setUpTheme();
        this.setUpCart();
      }
    });
  }

  setUpTheme() {
    this.themeService.toggleDarkMode(this.localStorageService.getDarkMode());
    const theme = this.localStorageService.getTheme();
    if (theme !== null) {
      this.themeService.changePrimaryColor(theme);
    }
  }

  setUpCart() {
    if (!this.localStorageService.isCartEmpty()) {
      const {items, total, quantity} = this.localStorageService.getCart();
      this.cartService.set(items, quantity, total);
    }
  }

  setUpLocale() {
    this.translateService.setTranslation('es', es);
    if (this.localStorageService.getLocale() !== 'en') {
      this.translateService.use('es');
      this.primeNgConfig.setTranslation(primeES);
    }
  }
}
