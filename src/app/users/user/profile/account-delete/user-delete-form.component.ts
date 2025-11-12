import {ChangeDetectionStrategy, Component, inject, OnDestroy} from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
import {logout} from '../../../../../utils/functions';
import {LoadingAnimationService} from '../../../../services/animation/loading-animation.service';
import {ErrorService} from '../../../../services/error/error.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import {myInput} from '../../../../../primeng/input';
import {myIcon} from '../../../../../primeng/icon';
import {injectMutation, QueryClient} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {CheckoutFormService} from '../../../../services/checkout/checkout-form.service';
import {environment} from '../../../../../environments/environment';
import {PasswordAuthorizationComponent} from '../../../../util/password/password-authorization.component';
import {Button} from 'primeng/button';
import {UserAPIService} from '../../../../../api/security';

@Component({
  selector: 'app-user-delete-form',
  imports: [
    PasswordAuthorizationComponent,
    Button,
    TranslatePipe,
  ],
  templateUrl: './user-delete-form.component.html',
  styleUrl: './user-delete-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDeleteFormComponent implements OnDestroy {
  private readonly backEndClientBaseUri = environment.url;
  private readonly errorService = inject(ErrorService);
  private readonly queryClient = inject(QueryClient);
  private readonly messageService = inject(MessageService);
  private readonly translateService = inject(TranslateService);
  private readonly loadingAnimationService = inject(LoadingAnimationService);
  private readonly authService = inject(AuthService);
  private readonly checkoutFormService = inject(CheckoutFormService);
  private readonly userAccountAPI = inject(UserAPIService);
  private readonly userId = this.authService.getId();
  protected passAuthVisibility = false;

  protected showPassAuth() {
    this.passAuthVisibility = true;
  }

  ngOnDestroy(): void {
    this.loadingAnimationService.stopLoading();
  }

  private delete = injectMutation(() => ({
    mutationFn: (data: { id: number, password: string }) => lastValueFrom(this.userAccountAPI.deleteById(data.id, data.password))
  }));

  protected onAuthorizedPassword(password: string) {
    this.loadingAnimationService.startLoading();

    this.delete.mutate({id: this.userId()!, password: password}, {
      onSuccess: () => {
        this.authService.logout();
        this.queryClient.removeQueries({queryKey: ["user"]});
        this.checkoutFormService.clear();

        this.messageService.add({
          severity: 'success',
          summary: this.translateService.instant("toast.severity.info"),
          detail: this.translateService.instant("component.user.delete.form"),
          life: 1000
        });

        setTimeout(() => {
          logout(this.backEndClientBaseUri);
        }, 1000);
      },
      onError: (error) => {
        this.errorService.handleError(error);
      },
      onSettled: () => {
        this.loadingAnimationService.stopLoading();
      }
    });
  }

  protected readonly myInput = myInput;
  protected readonly myIcon = myIcon;
}
