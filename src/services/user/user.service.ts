import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AddressFormData} from '../../interfaces/dto/forms/order';
import {catchError, of} from 'rxjs';
import {AddressDTO} from '../../interfaces/dto/order';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpClient = inject(HttpClient);

  public getAddressList(userId: string) {
    return this.httpClient.get<AddressDTO[]>(`http://192.168.1.128:8080/api/user/${userId}/address`, {withCredentials: true})
      .pipe(catchError((err, caught) => {
        // have to return an Observable or throw the error
        const error = err as string;
        console.log(error);
        console.log(err.error.message);
        const empty: AddressDTO[] = [];
        return of(empty);
      }));
  }

  public addAddress(userId: string, address: AddressFormData) {
    return this.httpClient.post(`http://192.168.1.128:8080/api/user/${userId}/address`, address, {
      withCredentials: true,
      responseType: "text"
    })
      .pipe(catchError((err, caught) => {
        throw err as string;
      }));
  }
}
