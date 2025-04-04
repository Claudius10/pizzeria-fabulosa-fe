import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginForm, RegisterForm} from '../../../utils/interfaces/http/account';
import {ResponseDTO} from '../../../utils/interfaces/http/api';
import {
  ANON_BASE,
  ANON_REGISTER,
  AUTH_BASE,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  BASE,
  USER_BASE,
  V1
} from '../../../utils/api-routes';
import {of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {buildErrorResponse} from '../../../utils/test-utils';
import {AuthService} from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountHttpService {
  private authService = inject(AuthService);
  private httpClient = inject(HttpClient);
  private PATH = environment.url;

  public login(data: LoginForm | null) {
    if (data === null) {
      return this.httpClient.post<ResponseDTO>(`${this.PATH + BASE + V1 + AUTH_BASE + AUTH_LOGIN}?username=donQuijote@gmail.com&password=Password1`,
        {responseType: "text"}, // -> without this, cookies won't be set
        {withCredentials: true});
    } else {
      return this.httpClient.post<ResponseDTO>(`${this.PATH + BASE + V1 + AUTH_BASE + AUTH_LOGIN}?username=${data.email}&password=${data.password}`,
        {responseType: "text"}, // -> without this, cookies won't be set
        {withCredentials: true});
    }
  }

  public logout() {
    return this.httpClient.post<ResponseDTO>(`${this.PATH + BASE + V1 + AUTH_BASE + AUTH_LOGOUT}`,
      {responseType: "text"}, // -> without this, cookies won't be set
      {withCredentials: true});
  }

  public create(data: RegisterForm) {
    return this.httpClient.post<ResponseDTO>(`${this.PATH + BASE + V1 + ANON_BASE + ANON_REGISTER}`, data);
  }

  public delete(password: string) {
    const userId = this.authService.userId;
    if (userId === null) return of(buildErrorResponse());

    return this.httpClient.delete<ResponseDTO>(`${this.PATH + BASE + V1 + USER_BASE}?id=${userId}&password=${password}`,
      {withCredentials: true});
  }
}
