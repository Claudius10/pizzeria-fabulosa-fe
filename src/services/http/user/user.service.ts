import {inject, Injectable} from '@angular/core';
import {BaseUserQueryOptions} from '../../../interfaces/base';
import {injectMutation, injectQuery} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {UserAddressListQueryResult} from '../../../interfaces/query';
import {UserAddressMutation, UserAddressMutationOptions} from '../../../interfaces/mutation';
import {UserHttpService} from './user-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userHttpService = inject(UserHttpService);

  public findUserAddressList(options: BaseUserQueryOptions): UserAddressListQueryResult {
    const query = injectQuery(() => ({
      queryKey: options.queryKey,
      queryFn: () => lastValueFrom(this.userHttpService.findUserAddressList(options.userId!))
    }));

    return {
      data: query.data,
      status: query.status,
      error: query.error
    };
  }

  public createUserAddress(): UserAddressMutation {
    const mutation = injectMutation(() => ({
      mutationFn: (options: UserAddressMutationOptions) => lastValueFrom(this.userHttpService.createUserAddress(options)),
    }));

    return {
      mutate: mutation.mutate,
      isError: mutation.isError,
      isPending: mutation.isPending,
      isSuccess: mutation.isSuccess,
    };
  }
}
