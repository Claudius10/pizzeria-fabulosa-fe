import {inject, Injectable, signal} from '@angular/core';
import {BaseUserQueryOptions} from '../../interfaces/base';
import {injectMutation, injectQuery} from '@tanstack/angular-query-experimental';
import {firstValueFrom} from 'rxjs';
import {UserAddressListQueryResult} from '../../interfaces/query';
import {AddressDTO} from '../../interfaces/dto/order';
import {UserAddressMutation, UserAddressMutationOptions} from '../../interfaces/mutation';
import {UserHttpService} from './user-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userHttpService = inject(UserHttpService);

  public findUserAddressList(options: BaseUserQueryOptions) {
    if (options.userId !== undefined) {
      const query = injectQuery(() => ({
        queryKey: options.queryKey,
        queryFn: () => firstValueFrom(this.userHttpService.findUserAddressList(options.userId!))
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

  public createUserAddress() {
    const mutation = injectMutation(() => ({
      mutationFn: (options: UserAddressMutationOptions) => firstValueFrom(this.userHttpService.createUserAddress(options)),
    }));

    const mutationResult: UserAddressMutation = {
      mutate: mutation.mutate,
      isError: mutation.isError,
      isPending: mutation.isPending,
      isSuccess: mutation.isSuccess,
    };

    return mutationResult;
  }
}
