import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpClient = inject(HttpClient);

}
