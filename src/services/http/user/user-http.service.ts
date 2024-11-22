import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AddressDTO} from '../../../interfaces/dto/order';
import {UserAddressMutationOptions} from '../../../interfaces/mutation';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  private httpClient = inject(HttpClient);

  public findUserAddressList(userId: string) {
    return this.httpClient.get<AddressDTO[]>(`http://192.168.1.128:8080/api/user/${userId}/address`, {withCredentials: true});
  }

  public createUserAddress(options: UserAddressMutationOptions) {
    return this.httpClient.post(`http://192.168.1.128:8080/api/user/${options.userId}/address`, options.data, {
      withCredentials: true,
      responseType: "text"
    });
  }
}
