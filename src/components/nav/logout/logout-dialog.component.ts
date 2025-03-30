import {ChangeDetectionStrategy, Component, inject, OnDestroy} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {MutationRequest, MutationResult} from '../../../utils/interfaces/mutation';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {DialogModule} from 'primeng/dialog';
import {Button} from 'primeng/button';
import {LoadingAnimationService} from '../../../services/animation/loading-animation.service';
import {CartService} from '../../../services/cart/cart.service';
import {UpperCasePipe} from '@angular/common';
import {injectMutation, QueryClient} from '@tanstack/angular-query-experimental';
import {CheckoutFormService} from '../../../services/checkout/checkout-form.service';
import {ResponseDTO} from '../../../utils/interfaces/http/api';
import {ErrorService} from '../../../services/error/error.service';
import {lastValueFrom} from 'rxjs';
import {AccountHttpService} from '../../../services/http/account/account-http.service';

@Component({
  selector: 'app-logout-dialog',
  imports: [
    DialogModule,
    TranslatePipe,
    UpperCasePipe,
    Button
  ],
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutDialogComponent implements OnDestroy {
  private loadingAnimationService = inject(LoadingAnimationService);
  private checkoutFormService = inject(CheckoutFormService);
  private accountHttpService = inject(AccountHttpService);
  private translateService = inject(TranslateService);
  private messageService = inject(MessageService);
  private errorService = inject(ErrorService);
  private queryClient = inject(QueryClient);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private logoutUser: MutationResult = injectMutation(() => ({
    mutationFn: (request: MutationRequest) => lastValueFrom(this.accountHttpService.logout())
  }));

  // visible provides hiding dialog on esc key press
  visible: boolean = this.authService.logoutDialog;

  ngOnDestroy(): void {
    this.loadingAnimationService.stopLoading();
  }

  acceptLogout() {
    this.logout();
  }

  hideLogoutDialog() {
    this.authService.logoutDialog = false;
    this.visible = false;
  }

  private logout() {
    this.loadingAnimationService.startLoading();
    this.logoutUser.mutate({payload: null}, {
      onSuccess: (response: ResponseDTO) => {
        // NOTE: successful logout does not return responseDTO, but fail does

        if (response && response.status.error && response.error) {
          this.errorService.handleError(response.error);
        } else {
          this.cartService.clear();
          this.queryClient.removeQueries({queryKey: ["user"]});
          this.authService.logout();
          this.checkoutFormService.clear();

          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant("toast.severity.info"),
            detail: this.translateService.instant("dialog.logout.success.message"),
            life: 2000
          });

          this.router.navigate(["/"]);
        }
      },
      onError: () => {
        this.messageService.add({
          severity: 'error',
          summary: this.translateService.instant("toast.severity.error"),
          detail: this.translateService.instant("dialog.logout.error.message"),
          life: 2000
        });
      },
      onSettled: () => {
        this.loadingAnimationService.stopLoading();
        this.hideLogoutDialog();
      }
    });
  }
}
