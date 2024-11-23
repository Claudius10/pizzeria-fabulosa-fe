import {ChangeDetectionStrategy, Component, inject, Signal, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {ThemeSelectorComponent} from '../../theme-selector/theme-selector.component';
import {AuthService} from '../../../../services/auth/auth.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {LocaleSelectorComponent} from '../../locale-selector/locale-selector.component';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmPopup, ConfirmPopupModule} from 'primeng/confirmpopup';
import {Button} from 'primeng/button';
import {AccountService} from '../../../../services/http/account/account.service';
import {LogoutMutation} from '../../../../interfaces/mutation';
import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    RouterLink,
    ThemeSelectorComponent,
    LocaleSelectorComponent,
    TranslatePipe,
    ConfirmPopupModule,
    Button,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './navigation-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private translateService = inject(TranslateService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private accountService = inject(AccountService);
  private logoutUser: LogoutMutation = this.accountService.logout();
  isAuthenticated: Signal<boolean> = this.authService.getIsAuthenticated();
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  popup(event: Event) {
    this.confirmationService.confirm({target: event.target as EventTarget});
  }

  accept() {
    this.confirmPopup.accept();
    this.logout();
  }

  reject() {
    this.confirmPopup.reject();
  }

  private logout() {
    const currentLang = this.translateService.currentLang;
    const successFeedbackMessage: string = currentLang === 'en' ? "Sign-out successful" : "Sesión cerrada con éxito";
    const errorFeedbackMessage: string = currentLang === 'en' ? "Sign-out unsuccessful" : "Error al cerrar la session";
    const summary: string = currentLang === 'en' ? "Account" : "Cuenta";

    this.logoutUser.mutate(undefined, {
      onSuccess: () => {
        this.authService.logout();
        this.messageService.add({severity: 'success', summary: summary, detail: successFeedbackMessage, life: 2000});
        this.router.navigate(["/"]).then(() => {

        }).catch(() => {

        });
      },
      onError: () => {
        this.messageService.add({severity: 'error', summary: summary, detail: errorFeedbackMessage, life: 2000});
      }
    });
  }
}
