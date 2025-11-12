import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {QueryResult} from '../../../utils/interfaces/query';
import {injectQuery, QueryClient} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {AUTH, ERROR, SUCCESS} from '../../../utils/constants';
import {CheckoutFormService} from '../../services/checkout/checkout-form.service';
import {AuthService} from '../../services/auth/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import {logout} from '../../../utils/functions';
import {USER_INFO} from '../../../utils/query-keys';
import {environment} from '../../../environments/environment';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {isPlatformBrowser} from '@angular/common';
import {UserAPIService, UserInfoDTO} from '../../../api/security';

@Component({
  selector: 'app-userinfo',
  imports: [],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserinfoComponent implements OnInit {
  private readonly backEndClientBaseUri = environment.url;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isServer = !isPlatformBrowser(this.platformId);
  private readonly destroyRef = inject(DestroyRef);
  private readonly queryClient = inject(QueryClient);
  private readonly translateService = inject(TranslateService);
  private readonly messageService = inject(MessageService);
  private readonly checkoutFormService = inject(CheckoutFormService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly authService = inject(AuthService);
  private readonly userAccountAPI = inject(UserAPIService);

  private query: QueryResult<UserInfoDTO | undefined> = injectQuery(() => ({
    queryKey: USER_INFO,
    queryFn: () => lastValueFrom(this.userAccountAPI.getUserInfo()),
    retry: false
  }));

  private statusObservable = toObservable(this.query.status);

  ngOnInit(): void {
    if (!this.isServer) {
      const subscription = this.statusObservable.subscribe({
        next: result => {

          if (result === ERROR) {
            if (this.localStorageService.exists(AUTH)) {
              this.logout();
            }

            const www_authenticate = this.query.error().headers.get('www-authenticate');
            if (www_authenticate != null) {
              this.fullLogout(www_authenticate);
            }
          }

          if (result === SUCCESS) {
            this.login(this.query.data()!);
          }
        }
      });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }

  private login(userInfo: UserInfoDTO) {
    const authenticated = this.authService.authenticate(userInfo);
    if (!authenticated) {
      this.messageService.add({
        severity: 'error',
        summary: this.translateService.instant("toast.severity.error"),
        detail: this.translateService.instant("toast.form.login.fail.detail"),
        life: 3000,
      });
    }
  }

  private logout() {
    this.authService.logout();
    this.queryClient.removeQueries({queryKey: ["user"]});
    this.checkoutFormService.clear();
  }

  private fullLogout(authHeader: string) {
    if (authHeader.includes("An error occurred while attempting to decode the Jwt")) {
      this.messageService.add({
        severity: 'warn',
        summary: this.translateService.instant("toast.severity.warning"),
        detail: this.translateService.instant("toast.error.api.token.expired"),
        life: 2000,
      });
    }

    setTimeout(() => {
      logout(this.backEndClientBaseUri);
    }, 2000);
  }
}
