import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserAddressDeleteMutationOptions, UserAddressMutationOptions} from '../../../interfaces/mutation';
import {ResponseDTO} from '../../../interfaces/http/api';
import {BASE, USER_ADDRESS, USER_BASE, V1} from '../../../utils/api-routes';
import {of} from 'rxjs';
import {buildErrorResponse, ensureId} from '../../../utils/functions';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  private httpClient = inject(HttpClient);
  private PATH = environment.url;

  public findUserAddressList(userId: string | null) {
    const result = ensureId([userId!]);

    if (!result) return of(buildErrorResponse());

    return this.httpClient.get<ResponseDTO>(`${this.PATH + BASE + V1 + USER_BASE}/${userId + USER_ADDRESS}`, {
      withCredentials: true
    });
  }

  public createUserAddress(options: UserAddressMutationOptions) {
    const result = ensureId([options.userId!]);

    if (!result) return of(buildErrorResponse());

    return this.httpClient.post<ResponseDTO>(`${this.PATH + BASE + V1 + USER_BASE}/${options.userId + USER_ADDRESS}`, options.data, {
      withCredentials: true
    });
  }

  public deleteUserAddress(options: UserAddressDeleteMutationOptions) {
    const result = ensureId([options.userId!]);

    if (!result) return of(buildErrorResponse());

    return this.httpClient.delete<ResponseDTO>(`${this.PATH + BASE + V1 + USER_BASE}/${options.userId + USER_ADDRESS}/${options.addressId}`, {
      withCredentials: true
    });
  }
}
