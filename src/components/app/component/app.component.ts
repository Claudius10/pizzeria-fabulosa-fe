import {AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavigationBarComponent} from '../../nav/navigation-bar/navigation-bar.component';
import {FooterComponent} from '../../footer/footer.component';
import {TranslateService} from '@ngx-translate/core';
import en from "../../../../public/i18n/en.json";
import es from "../../../../public/i18n/es.json";
import {LocalstorageService} from '../../../services/localstorage/localstorage.service';
import {CartService} from '../../../services/cart/cart.service';
import {ToastModule} from "primeng/toast";
import {ErrorService} from '../../../services/error/error.service';
import {MessageService} from 'primeng/api';

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
export class AppComponent implements OnInit, AfterViewInit {
  private translateService = inject(TranslateService);
  private localStorageService = inject(LocalstorageService);
  private cartService = inject(CartService);
  private messageService = inject(MessageService);

  ngOnInit() {
    this.setUpLocale();
    this.setUpTheme();
    this.setUpCart();
  }

  ngAfterViewInit(): void {
    this.messageService.add({
      severity: 'info',
      summary: this.translateService.instant("toast.severity.info"),
      detail: this.translateService.instant("toast.dev.note"),
      life: 5000,
    });
  }

  setUpTheme() {

  }

  setUpCart() {
    if (!this.localStorageService.isCartEmpty()) {
      const {items, total, quantity} = this.localStorageService.getCart();
      this.cartService.set(items, quantity, total, false);
    }
  }

  setUpLocale() {
    const locale = this.localStorageService.getLocale();
    const langToUse = locale === "en" ? en : es;
    this.translateService.addLangs(['es', 'en', 'primeng-es', 'primeng-en']);
    this.translateService.setTranslation(locale, langToUse);
    this.translateService.use(locale);
  }
}
