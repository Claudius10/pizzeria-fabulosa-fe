import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AddressDTO} from '../../interfaces/dto/order';

@Injectable({
  providedIn: 'root'
})
export class AddressHttpService {
  private httpClient = inject(HttpClient);

  public findUserAddressList(userId: string) {
    return this.httpClient.get<AddressDTO[]>(`http://192.168.1.128:8080/api/user/${userId}/address`, {withCredentials: true});
  }
}
