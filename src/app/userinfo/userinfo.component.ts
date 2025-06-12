import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {QueryResult} from '../../utils/interfaces/query';
import {UserAccountAPIService, UserInfoDTO} from '../../api/user';
import {injectQuery, QueryClient} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {ERROR, SUCCESS} from '../../utils/constants';
import {CheckoutFormService} from '../../services/checkout/checkout-form.service';
import {AuthService} from '../../services/auth/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import {logout} from '../../utils/functions';
import {USER_INFO} from '../../utils/query-keys';

@Component({
  selector: 'app-userinfo',
  imports: [],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserinfoComponent implements OnInit {
  private checkoutFormService = inject(CheckoutFormService);
  private userAccountAPI = inject(UserAccountAPIService);
  private translateService = inject(TranslateService);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  private queryClient = inject(QueryClient);
  private destroyRef = inject(DestroyRef);

  private query: QueryResult<UserInfoDTO | undefined> = injectQuery(() => ({
    queryKey: USER_INFO,
    queryFn: () => lastValueFrom(this.userAccountAPI.getUserInfo()),
    retry: false
  }));

  private statusObservable = toObservable(this.query.status);

  ngOnInit(): void {

    const subscription = this.statusObservable.subscribe({
      next: result => {

        if (result === ERROR) {

          if (this.authService.isAuthenticated()) {
            this.authService.logout();
            this.queryClient.removeQueries({queryKey: ["user"]});
            this.checkoutFormService.clear();
          }

          const www_authenticate: string = this.query.error().headers.get('www-authenticate');
          if (www_authenticate != null) {

            if (www_authenticate.includes("An error occurred while attempting to decode the Jwt")) {
              this.messageService.add({
                severity: 'warn',
                summary: this.translateService.instant("toast.severity.warning"),
                detail: this.translateService.instant("toast.error.api.token.expired"),
                life: 2000,
              });
            }

            setTimeout(() => {
              logout();
            }, 2000);
          }
        }

        if (result === SUCCESS) {
          const userInfo: UserInfoDTO = this.query.data()!;
          const result = this.authService.authenticate(userInfo);
          if (!result) {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant("toast.severity.error"),
              detail: this.translateService.instant("toast.form.login.fail.detail"),
              life: 3000,
            });
          }
        }
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
