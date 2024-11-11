import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AddressFormData} from '../../interfaces/dto/forms/order';
import {catchError} from 'rxjs';
import {AddressDTO} from '../../interfaces/dto/order';
import {toObservable} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private httpClient = inject(HttpClient);
  private addressList = signal<AddressDTO[]>([]);

  public findAddressList(userId: string | undefined) {
    if (userId === undefined) {
      return toObservable(this.addressList);
    }

    return this.httpClient.get<AddressDTO[]>(`http://192.168.1.128:8080/api/user/${userId}/address`, {withCredentials: true})
      .pipe(catchError((err, caught) => {
        // have to return an Observable or throw the error
        const error = err as string;
        console.log(error);
        console.log(err.error.message);
        return toObservable(this.addressList);
      }));
  }

  public getAddressList() {
    return this.addressList.asReadonly();
  }

  public setAddressList(addressList: AddressDTO[]) {
    this.addressList.set(addressList);
  }

  public createAddress(userId: string, address: AddressFormData) {
    return this.httpClient.post(`http://192.168.1.128:8080/api/user/${userId}/address`, address, {
      withCredentials: true,
      responseType: "text"
    })
      .pipe(catchError((err, caught) => {
        throw err as string;
      }));
  }
}
