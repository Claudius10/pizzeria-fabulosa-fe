import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseDTO} from '../../../../utils/interfaces/http/api';
import {ANON_BASE, ANON_REGISTER, BASE, USER_ADDRESS, USER_BASE, V1} from '../../../../utils/api-routes';
import {of} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {buildErrorResponse} from '../../../../utils/test-utils';
import {AuthService} from '../../../common/auth/auth.service';
import {AddressFormData} from '../../../../utils/interfaces/http/order';
import {RegisterForm} from '../../../../utils/interfaces/http/account';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  private authService = inject(AuthService);
  private httpClient = inject(HttpClient);
  private PATH = environment.url;

  public findUserAddressList() {
    const userId = this.authService.userId;
    if (userId === null) return of(buildErrorResponse());

    return this.httpClient.get<ResponseDTO>(`${this.PATH + BASE + V1 + USER_BASE}/${userId + USER_ADDRESS}`, {
      withCredentials: true
    });
  }

  public createUserAddress(data: AddressFormData) {
    const userId = this.authService.userId;
    if (userId === null) return of(buildErrorResponse());

    return this.httpClient.post<ResponseDTO>(`${this.PATH + BASE + V1 + USER_BASE}/${userId + USER_ADDRESS}`, data, {
      withCredentials: true
    });
  }

  public deleteUserAddress(addressId: string) {
    const userId = this.authService.userId;
    if (userId === null) return of(buildErrorResponse());

    return this.httpClient.delete<ResponseDTO>(`${this.PATH + BASE + V1 + USER_BASE}/${userId + USER_ADDRESS}/${addressId}`, {
      withCredentials: true
    });
  }

  public delete(password: string) {
    const userId = this.authService.userId;
    if (userId === null) return of(buildErrorResponse());

    return this.httpClient.delete<ResponseDTO>(`${this.PATH + BASE + V1 + USER_BASE}?id=${userId}&password=${password}`,
      {withCredentials: true});
  }

  public create(data: RegisterForm) {
    return this.httpClient.post<ResponseDTO>(`${this.PATH + BASE + V1 + ANON_BASE + ANON_REGISTER}`, data);
  }
}
