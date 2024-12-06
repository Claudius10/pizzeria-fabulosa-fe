import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DeleteAccountForm, LoginForm, RegisterForm} from '../../../interfaces/http/account';

@Injectable({
  providedIn: 'root'
})
export class AccountHttpService {
  private httpClient = inject(HttpClient);

  public login(data: LoginForm) {
    return this.httpClient.post(`http://192.168.1.128:8080/api/auth/login?username=${data.email}&password=${data.password}`,
      {responseType: "text"}, // -> without this, cookies won't be set
      {withCredentials: true});
  }

  public logout() {
    return this.httpClient.post(`http://192.168.1.128:8080/api/auth/logout`,
      {responseType: "text"}, // -> without this, cookies won't be set
      {withCredentials: true});
  }

  public create(data: RegisterForm) {
    return this.httpClient.post("http://192.168.1.128:8080/api/anon/register", data, {responseType: "text"});
  }

  public delete(data: DeleteAccountForm) {
    return this.httpClient.delete(`http://192.168.1.128:8080/api/user?id=${data.userId}&password=${data.password}`,
      {withCredentials: true, responseType: "text"});
  }
}
