import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterForm} from '../../interfaces/forms/account';

@Injectable({
  providedIn: 'root'
})
export class RegisterHttpService {
  private httpClient = inject(HttpClient);

  public registerNewUser(data: RegisterForm) {
    return this.httpClient.post("http://192.168.1.128:8080/api/anon/register", data, {responseType: "text"});
  }
}
