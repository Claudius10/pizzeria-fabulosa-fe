import {ChangeDetectionStrategy, Component, inject, OnDestroy} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
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
import {ErrorService} from '../../../services/error/error.service';
import {lastValueFrom} from 'rxjs';
import {LogoutAPIService} from '../../../api';

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
  private translateService = inject(TranslateService);
  private messageService = inject(MessageService);
  private logoutAPI = inject(LogoutAPIService);
  private errorService = inject(ErrorService);
  private queryClient = inject(QueryClient);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private logoutUser = injectMutation(() => ({
    mutationFn: (payload: null) => lastValueFrom(this.logoutAPI.logout())
  }));

  // visible provides hiding dialog on esc key press
  protected visible: boolean = this.authService.logoutDialogVisibility();

  ngOnDestroy(): void {
    this.loadingAnimationService.stopLoading();
  }

  protected acceptLogout() {
    this.logout();
  }

  protected hideLogoutDialog() {
    this.authService.logoutDialogVisibility.set(false);
    this.visible = this.authService.logoutDialogVisibility();
  }

  private logout() {
    this.loadingAnimationService.startLoading();
    this.logoutUser.mutate(null, {

      onSuccess: () => {
        this.authService.logout();
        this.queryClient.removeQueries({queryKey: ["user"]});
        this.cartService.clear();
        this.checkoutFormService.clear();

        this.messageService.add({
          severity: 'success',
          summary: this.translateService.instant("toast.severity.info"),
          detail: this.translateService.instant("dialog.logout.success.message"),
          life: 2000
        });

        this.router.navigate(["/"]);
      },
      onError: (error) => {
        this.errorService.handleError(error);
      },
      onSettled: () => {
        this.loadingAnimationService.stopLoading();
        this.hideLogoutDialog();
      }
    });
  }
}
