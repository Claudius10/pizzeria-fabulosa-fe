import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Button} from 'primeng/button';
import {LogoutMutation} from '../../../../interfaces/mutation';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AccountService} from '../../../../services/http/account/account.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-logout-popup',
  standalone: true,
  imports: [
    ConfirmPopupModule,
    TranslatePipe,
    Button
  ],
  templateUrl: './logout-popup.component.html',
  styleUrl: './logout-popup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutPopupComponent {
  private router = inject(Router);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private translateService = inject(TranslateService);
  private confirmationService = inject(ConfirmationService);
  private logoutUser: LogoutMutation = this.accountService.logout();

  logoutPopup(event: Event) {
    this.confirmationService.confirm({target: event.target as EventTarget});
  }

  acceptLogout() {
    this.logout();
  }

  rejectLogout() {
    this.confirmationService.close();
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
