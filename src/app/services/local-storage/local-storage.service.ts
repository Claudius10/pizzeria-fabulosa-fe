import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  add(token: string, value: string) {
    localStorage.setItem(token, value);
  }

  remove(token: string) {
    localStorage.removeItem(token);
  }

  get(token: string) {
    return localStorage.getItem(token);
  }

  addObject(token: string, value: any) {
    localStorage.setItem(token, JSON.stringify(value));
  }

  getObject(token: string) {
    if (this.exists(token)) {
      return JSON.parse(localStorage.getItem(token) as string);
    } else {
      return null;
    }
  }

  exists(token: string) {
    return localStorage.getItem(token) !== null;
  }
}
