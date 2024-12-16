import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserAddressMutationOptions} from '../../../interfaces/mutation';
import {ResponseDTO} from '../../../interfaces/http/api';
import {BASE, PATH, USER_ADDRESS, USER_BASE, V1} from '../../../utils/api-routes';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  private httpClient = inject(HttpClient);

  public findUserAddressList(userId: string) {
    return this.httpClient.get<ResponseDTO>(`${PATH + BASE + V1 + USER_BASE + userId + USER_ADDRESS}`, {
      withCredentials: true
    });
  }

  public createUserAddress(options: UserAddressMutationOptions) {
    return this.httpClient.post<ResponseDTO>(`${PATH + BASE + V1 + USER_BASE + options.userId + USER_ADDRESS}`, options.data, {
      withCredentials: true
    });
  }
}
