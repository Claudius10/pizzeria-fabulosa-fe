import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginForm} from '../../interfaces/forms/account';

@Injectable({
  providedIn: 'root'
})
export class LoginHttpService {
  private httpClient = inject(HttpClient);

  public login(data: LoginForm) {
    return this.httpClient.post(`http://192.168.1.128:8080/api/auth/login?username=${data.email}&password=${data.password}`,
      {responseType: "text"}, // -> without this, cookies won't be set
      {withCredentials: true});
  }
}
