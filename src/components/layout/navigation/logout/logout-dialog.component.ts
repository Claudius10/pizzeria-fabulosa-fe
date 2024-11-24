import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LogoutMutation} from '../../../../interfaces/mutation';
import {MessageService} from 'primeng/api';
import {AccountService} from '../../../../services/http/account/account.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth/auth.service';
import {DialogModule} from 'primeng/dialog';
import {ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-logout-dialog',
  standalone: true,
  imports: [
    DialogModule,
    ButtonDirective
  ],
  templateUrl: './logout-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutDialogComponent {
  private router = inject(Router);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private translateService = inject(TranslateService);
  private logoutUser: LogoutMutation = this.accountService.logout();
  // visible provides hiding dialog on esc key press
  visible: boolean = this.authService.getIsLogoutDialogVisible();

  acceptLogout() {
    this.logout();
  }

  rejectLogout() {
    this.authService.setLogoutDialog(false);
    this.visible = false;
  }

  private logout() {
    const currentLang = this.translateService.currentLang;
    const successFeedbackMessage: string = currentLang === 'en' ? "Sign-out successful" : "Sesión cerrada con éxito";
    const errorFeedbackMessage: string = currentLang === 'en' ? "Sign-out unsuccessful" : "Error al cerrar la session";
    const summary: string = currentLang === 'en' ? "Account" : "Cuenta";

    this.logoutUser.mutate(undefined, {
      onSuccess: () => {
        this.authService.logout();
        this.rejectLogout();
        this.messageService.add({severity: 'success', summary: summary, detail: successFeedbackMessage, life: 2000});
        this.router.navigate(["/"]);
      },
      onError: () => {
        this.messageService.add({severity: 'error', summary: summary, detail: errorFeedbackMessage, life: 2000});
      }
    });
  }
}
