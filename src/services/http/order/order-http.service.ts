import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AnonOrderFormData, NewUserOrderFormData} from '../../../interfaces/http/order';
import {ResponseDTO} from '../../../interfaces/http/api';
import {ANON_BASE, ANON_ORDER, BASE, ORDER_BASE, ORDER_SUMMARY, PATH, USER_BASE, V1} from '../../../utils/api-routes';
import {BaseQueryOptionsIdAndUser} from '../../../interfaces/query';
import {UserOrderDeleteMutationOptions} from '../../../interfaces/mutation';
import {ErrorService} from '../../error/error.service';
import {of} from 'rxjs';
import {buildErrorResponse} from '../../../utils/functions';

@Injectable({
  providedIn: 'root'
})
export class OrderHttpService {
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  public createUserOrder(data: NewUserOrderFormData) {
    const result = this.errorService.ensureId([data.userId!]);

    if (!result) return of(buildErrorResponse());

    return this.httpClient.post<ResponseDTO>(`${PATH + BASE + V1 + USER_BASE}/${data.userId + ORDER_BASE}`, data.order, {withCredentials: true});
  }

  public createAnonOrder(data: AnonOrderFormData) {
    return this.httpClient.post<ResponseDTO>(`${PATH + BASE + V1 + ANON_BASE + ANON_ORDER}`, data);
  }

  public findOrderSummaryList(userId: string | null, pageNumber: number, pageSize: number) {
    const result = this.errorService.ensureId([userId!]);

    if (!result) return of(buildErrorResponse());

    return this.httpClient.get<ResponseDTO>(`${PATH + BASE + V1 + USER_BASE}/${userId + ORDER_BASE + ORDER_SUMMARY}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {withCredentials: true});
  }

  public findUserOrder(options: BaseQueryOptionsIdAndUser) {
    const result = this.errorService.ensureId([options.userId!]);

    if (!result) return of(buildErrorResponse());

    return this.httpClient.get<ResponseDTO>(`${PATH + BASE + V1 + USER_BASE}/${options.userId + ORDER_BASE}/${options.id}`,
      {withCredentials: true});
  }

  public deleteUserOrder(data: UserOrderDeleteMutationOptions) {
    const result = this.errorService.ensureId([data.userId!]);

    if (!result) return of(buildErrorResponse());

    return this.httpClient.delete<ResponseDTO>(`${PATH + BASE + V1 + USER_BASE}/${data.userId + ORDER_BASE}/${data.orderId}`,
      {withCredentials: true});
  }
}
