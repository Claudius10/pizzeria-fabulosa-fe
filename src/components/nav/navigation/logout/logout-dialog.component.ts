import {ChangeDetectionStrategy, Component, inject, OnDestroy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MutationResult} from '../../../../interfaces/mutation';
import {MessageService} from 'primeng/api';
import {AccountService} from '../../../../services/http/account/account.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth/auth.service';
import {DialogModule} from 'primeng/dialog';
import {ButtonDirective} from 'primeng/button';
import {LoadingAnimationService} from '../../../../services/navigation/loading-animation.service';
import {CartService} from '../../../../services/cart/cart.service';

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
export class LogoutDialogComponent implements OnDestroy {
  private router = inject(Router);
  private loadingAnimationService = inject(LoadingAnimationService);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private translateService = inject(TranslateService);
  private cartService = inject(CartService);
  private logoutUser: MutationResult = this.accountService.logout();
  // visible provides hiding dialog on esc key press
  visible: boolean = this.authService.getIsLogoutDialogVisible();

  ngOnDestroy(): void {
    this.loadingAnimationService.stopLoading();
  }

  acceptLogout() {
    this.logout();
  }

  hideLogoutDialog() {
    this.authService.setLogoutDialog(false);
    this.visible = false;
  }

  private logout() {
    this.loadingAnimationService.startLoading();

    const currentLang = this.translateService.currentLang;
    const successFeedbackMessage: string = currentLang === 'en' ? "Sign-out successful" : "Sesión cerrada con éxito";
    const errorFeedbackMessage: string = currentLang === 'en' ? "Sign-out unsuccessful" : "Error al cerrar la session";
    const summary: string = currentLang === 'en' ? "Account" : "Cuenta";

    this.logoutUser.mutate({payload: null}, {
      onSuccess: () => {
        this.authService.logout();
        this.hideLogoutDialog();
        this.messageService.add({severity: 'success', summary: summary, detail: successFeedbackMessage, life: 2000});
        this.cartService.clear();
        this.router.navigate(["/"]);
      },
      onError: () => {
        this.messageService.add({severity: 'error', summary: summary, detail: errorFeedbackMessage, life: 2000});
      },
      onSettled: () => {
        this.loadingAnimationService.stopLoading();
      }
    });
  }
}
