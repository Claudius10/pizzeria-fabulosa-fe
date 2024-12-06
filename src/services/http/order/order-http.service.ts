import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AnonOrderFormData, NewUserOrderFormData, UpdateUserOrderFormData} from '../../../interfaces/http/order';
import {AnonOrderDTO, OrderDTO, OrderSummaryListDTO} from '../../../interfaces/dto/order';
import {UserOrderQueryOptions} from '../../../interfaces/query';
import {UserOrderDeleteMutationOptions} from '../../../interfaces/mutation';

@Injectable({
  providedIn: 'root'
})
export class OrderHttpService {
  private httpClient = inject(HttpClient);

  public createUserOrder(data: NewUserOrderFormData) {
    return this.httpClient.post<string>(`http://192.168.1.128:8080/api/user/${data.userId}/order`, data.order, {withCredentials: true});
  }

  public createAnonOrder(data: AnonOrderFormData) {
    return this.httpClient.post<AnonOrderDTO>(`http://192.168.1.128:8080/api/anon/order`, data);
  }

  public findOrderSummaryList(userId: string | undefined, pageNumber: number, pageSize: number) {
    return this.httpClient.get<OrderSummaryListDTO>
    (`http://192.168.1.128:8080/api/user/${userId}/order/summary?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {withCredentials: true});
  }

  public findUserOrder(options: UserOrderQueryOptions) {
    return this.httpClient.get<OrderDTO>(`http://192.168.1.128:8080/api/user/${options.userId}/order/${options.orderId}`,
      {withCredentials: true});
  }

  public updateUserOrder(data: UpdateUserOrderFormData) {
    return this.httpClient.put<string>(`http://192.168.1.128:8080/api/user/${data.userId}/order/${data.orderId}`, data.order,
      {withCredentials: true});
  }

  public deleteUserOrder(data: UserOrderDeleteMutationOptions) {
    return this.httpClient.delete<string>(`http://192.168.1.128:8080/api/user/${data.userId}/order/${data.orderId}`,
      {withCredentials: true});
  }
}
