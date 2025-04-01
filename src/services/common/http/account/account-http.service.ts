import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginForm} from '../../../../utils/interfaces/http/account';
import {ResponseDTO} from '../../../../utils/interfaces/http/api';
import {AUTH_BASE, AUTH_LOGIN, AUTH_LOGOUT, BASE, V1} from '../../../../utils/api-routes';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountHttpService {
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
}
