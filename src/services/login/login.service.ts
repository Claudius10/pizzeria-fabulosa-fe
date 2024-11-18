import {inject, Injectable} from '@angular/core';
import {LoginHttpService} from './login-http.service';
import {injectMutation} from '@tanstack/angular-query-experimental';
import {LoginMutation} from '../../interfaces/mutation';
import {LoginForm} from '../../interfaces/forms/account';
import {AuthService} from '../auth/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginHttpService = inject(LoginHttpService);
  private authService = inject(AuthService);
  private cookieService = inject(CookieService);

  public login() {
    const mutation = injectMutation(() => ({
      mutationFn: (data: LoginForm) => lastValueFrom(this.loginHttpService.login(data)), onSuccess: () => {
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
}
