import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DeleteAccountForm, LoginForm, RegisterForm} from '../../../interfaces/http/account';
import {ResponseDTO} from '../../../interfaces/http/api';
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
import {buildErrorResponse, ensureId} from '../../../utils/functions';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountHttpService {
  private httpClient = inject(HttpClient);
  private PATH = environment.url;

  public login(data: LoginForm) {
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

  public delete(data: DeleteAccountForm) {
    const result = ensureId([data.userId!]);

    if (!result) return of(buildErrorResponse());

    return this.httpClient.delete<ResponseDTO>(`${this.PATH + BASE + V1 + USER_BASE}?id=${data.userId}&password=${data.password}`,
      {withCredentials: true});
  }
}
