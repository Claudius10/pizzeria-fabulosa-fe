import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AnonOrderFormData, NewUserOrderFormData, UpdateUserOrderFormData} from '../../../interfaces/http/order';
import {ResponseDTO} from '../../../interfaces/http/api';
import {ANON_BASE, ANON_ORDER, BASE, ORDER_BASE, ORDER_SUMMARY, PATH, USER_BASE, V1} from '../../../utils/api-routes';
import {UserOrderQueryOptions} from '../../../interfaces/query';
import {UserOrderDeleteMutationOptions} from '../../../interfaces/mutation';

@Injectable({
  providedIn: 'root'
})
export class OrderHttpService {
  private httpClient = inject(HttpClient);

  public createUserOrder(data: NewUserOrderFormData) {
    return this.httpClient.post<ResponseDTO>(`${PATH + BASE + V1 + USER_BASE + data.userId + ORDER_BASE}`, data.order, {withCredentials: true});
  }

  public createAnonOrder(data: AnonOrderFormData) {
    return this.httpClient.post<ResponseDTO>(`${PATH + BASE + V1 + ANON_BASE + ANON_ORDER}`, data);
  }

  public findOrderSummaryList(userId: string | undefined, pageNumber: number, pageSize: number) {
    return this.httpClient.get<ResponseDTO>(`${PATH + BASE + V1 + USER_BASE + userId + ORDER_BASE + ORDER_SUMMARY}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {withCredentials: true});
  }

  public findUserOrder(options: UserOrderQueryOptions) {
    return this.httpClient.get<ResponseDTO>(`${PATH + BASE + V1 + USER_BASE + options.userId + ORDER_BASE}${options.orderId}`,
      {withCredentials: true});

  }

  public updateUserOrder(data: UpdateUserOrderFormData) {
    return this.httpClient.put<ResponseDTO>(`${PATH + BASE + V1 + USER_BASE + data.userId + ORDER_BASE}${data.orderId}`, data.order,
      {withCredentials: true});
  }

  public deleteUserOrder(data: UserOrderDeleteMutationOptions) {
    return this.httpClient.delete<ResponseDTO>(`${PATH + BASE + V1 + USER_BASE + data.userId + ORDER_BASE}${data.orderId}`,
      {withCredentials: true});
  }
}
