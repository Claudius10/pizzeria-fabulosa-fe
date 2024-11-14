import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterForm} from '../../interfaces/forms/account';
import {catchError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private httpClient = inject(HttpClient);

  public registerNewUser(user: RegisterForm) {
    return this.httpClient.post("http://192.168.1.128:8080/api/anon/register", user, {responseType: "text"})
      .pipe(catchError((err, caught) => {
        throw err as string;
      }));
  }
}
