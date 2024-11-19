import {inject, Injectable} from '@angular/core';
import {injectMutation} from '@tanstack/angular-query-experimental';
import {DeleteAccountForm, LoginForm, RegisterForm} from '../../interfaces/forms/account';
import {firstValueFrom, lastValueFrom} from 'rxjs';
import {DeleteMutation, LoginMutation, LogoutMutation, RegisterMutation} from '../../interfaces/mutation';
import {AuthService} from '../auth/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {AccountHttpService} from './account-http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountHttpService = inject(AccountHttpService);
  private authService = inject(AuthService);
  private cookieService = inject(CookieService);

  public login() {
    const mutation = injectMutation(() => ({
      mutationFn: (data: LoginForm) => lastValueFrom(this.accountHttpService.login(data)), onSuccess: () => {
        this.authService.setUserCredentials(this.cookieService.get("idToken"));
      }
    }));

    const mutationResult: LoginMutation = {
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      isPending: mutation.isPending
    };

    return mutationResult;
  }

  public logout() {
    const mutation = injectMutation(() => ({
      mutationFn: () => lastValueFrom(this.accountHttpService.logout())
    }));

    const mutationResult: LogoutMutation = {
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      isPending: mutation.isPending
    };

    return mutationResult;
  }

  public create() {
    const mutation = injectMutation(() => ({
      mutationFn: (data: RegisterForm) => lastValueFrom(this.accountHttpService.create(data))
    }));

    const mutationResult: RegisterMutation = {
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      isPending: mutation.isPending
    };

    return mutationResult;
  }

  public delete() {
    const mutation = injectMutation(() => ({
      mutationFn: (data: DeleteAccountForm) => lastValueFrom(this.accountHttpService.delete(data))
    }));

    const mutationResult: DeleteMutation = {
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      isPending: mutation.isPending
    };

    return mutationResult;
  }
}
