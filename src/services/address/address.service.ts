import {inject, Injectable, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {AddressDTO} from '../../interfaces/dto/order';
import {AddressHttpService} from './address-http.service';
import {BaseUserQueryOptions, UserAddressListQueryResult} from '../../interfaces/query';
import {injectQuery} from '@tanstack/angular-query-experimental';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private addressHttpService = inject(AddressHttpService);

  public findUserAddressList(options: BaseUserQueryOptions) {
    if (options.userId !== undefined) {
      const query = injectQuery(() => ({
        queryKey: options.queryKey,
        queryFn: () => firstValueFrom(this.addressHttpService.findUserAddressList(options.userId!))
      }));

      const queryResult: UserAddressListQueryResult = {
        data: query.data,
        status: query.status,
        error: query.error
      };

      return queryResult;
    }

    const emptyAddressList: AddressDTO[] = [];
    const queryResult: UserAddressListQueryResult = {
      data: signal(emptyAddressList),
      status: signal("error"),
      error: signal(new Error("User id is undefined"))
    };

    return queryResult;
  }

  /*public createAddress(userId: string, address: AddressFormData) {
    return this.httpClient.post(`http://192.168.1.128:8080/api/user/${userId}/address`, address, {
      withCredentials: true,
      responseType: "text"
    })
      .pipe(catchError((err, caught) => {
        throw err as string;
      }));
  }*/
}
