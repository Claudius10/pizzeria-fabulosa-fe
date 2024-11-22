import {inject, Injectable} from '@angular/core';
import {injectMutation} from '@tanstack/angular-query-experimental';
import {DeleteAccountForm, LoginForm, RegisterForm} from '../../../interfaces/forms/account';
import {lastValueFrom} from 'rxjs';
import {DeleteMutation, LoginMutation, LogoutMutation, RegisterMutation} from '../../../interfaces/mutation';
import {AuthService} from '../../auth/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {AccountHttpService} from './account-http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountHttpService = inject(AccountHttpService);
  private authService = inject(AuthService);
  private cookieService = inject(CookieService);

  public login(): LoginMutation {
    const mutation = injectMutation(() => ({
      mutationFn: (data: LoginForm) => lastValueFrom(this.accountHttpService.login(data)), onSuccess: () => {
        this.authService.setUserCredentials(this.cookieService.get("idToken"));
      }
    }));

    return {
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      isPending: mutation.isPending
    };
  }

  public logout(): LogoutMutation {
    const mutation = injectMutation(() => ({
      mutationFn: () => lastValueFrom(this.accountHttpService.logout())
    }));

    return {
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      isPending: mutation.isPending
    };
  }

  public create(): RegisterMutation {
    const mutation = injectMutation(() => ({
      mutationFn: (data: RegisterForm) => lastValueFrom(this.accountHttpService.create(data))
    }));

    return {
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      isPending: mutation.isPending
    };
  }

  public delete(): DeleteMutation {
    const mutation = injectMutation(() => ({
      mutationFn: (data: DeleteAccountForm) => lastValueFrom(this.accountHttpService.delete(data))
    }));

    return {
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      isPending: mutation.isPending
    };
  }
}
