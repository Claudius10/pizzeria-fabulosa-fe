import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AnonOrderFormData, UserOrderFormData} from '../../../utils/interfaces/http/order';
import {ResponseDTO} from '../../../utils/interfaces/http/api';
import {ANON_BASE, ANON_ORDER, BASE, ORDER_BASE, ORDER_SUMMARY, USER_BASE, V1} from '../../../utils/api-routes';
import {of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {buildErrorResponse} from '../../../utils/test-utils';
import {AuthService} from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderHttpService {
  private authService = inject(AuthService);
  private httpClient = inject(HttpClient);
  private PATH = environment.url;

  public createUserOrder(data: UserOrderFormData) {
    const userId = this.authService.userId;
    if (userId === null) return of(buildErrorResponse());

    return this.httpClient.post<ResponseDTO>(`${this.PATH + BASE + V1 + USER_BASE}/${userId + ORDER_BASE}`, data, {withCredentials: true});
  }

  public createAnonOrder(data: AnonOrderFormData) {
    return this.httpClient.post<ResponseDTO>(`${this.PATH + BASE + V1 + ANON_BASE + ANON_ORDER}`, data);
  }

  public findOrderSummaryList(pageNumber: number) {
    const userId = this.authService.userId;
    if (userId === null) return of(buildErrorResponse());

    return this.httpClient.get<ResponseDTO>(`${this.PATH + BASE + V1 + USER_BASE}/${userId + ORDER_BASE + ORDER_SUMMARY}?pageNumber=${pageNumber}&pageSize=${5}`,
      {withCredentials: true});
  }

  public findUserOrder(orderId: string) {
    const userId = this.authService.userId;
    if (userId === null) return of(buildErrorResponse());

    return this.httpClient.get<ResponseDTO>(`${this.PATH + BASE + V1 + USER_BASE}/${userId + ORDER_BASE}/${orderId}`,
      {withCredentials: true});
  }

  public deleteUserOrder(orderId: string) {
    const userId = this.authService.userId;
    if (userId === null) return of(buildErrorResponse());

    return this.httpClient.delete<ResponseDTO>(`${this.PATH + BASE + V1 + USER_BASE}/${userId + ORDER_BASE}/${orderId}`,
      {withCredentials: true});
  }
}
