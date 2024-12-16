import {inject, Injectable} from '@angular/core';
import {injectMutation, injectQuery, injectQueryClient, QueryClient} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {UserHttpService} from './user-http.service';
import {BaseUserQueryOptions, QueryResult} from '../../../interfaces/query';
import {MutationRequest, MutationResult} from '../../../interfaces/mutation';
import {USER_ADDRESS_LIST} from '../../../utils/query-keys';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userHttpService = inject(UserHttpService);
  private queryClient: QueryClient = injectQueryClient();

  public findUserAddressList(options: BaseUserQueryOptions): QueryResult {
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

  public createUserAddress(): MutationResult {
    const mutation = injectMutation(() => ({
      mutationFn: (request: MutationRequest) => lastValueFrom(this.userHttpService.createUserAddress(request.payload)),
      onSuccess: () => {
        this.queryClient.invalidateQueries({queryKey: USER_ADDRESS_LIST});
      }
    }));

    return {
      mutate: mutation.mutate,
      isError: mutation.isError,
      isPending: mutation.isPending,
      isSuccess: mutation.isSuccess,
    };
  }

  public deleteUserAddress(): MutationResult {
    const mutation = injectMutation(() => ({
      mutationFn: (request: MutationRequest) => lastValueFrom(this.userHttpService.deleteUserAddress(request.payload)),
      onSuccess: () => {
        this.queryClient.invalidateQueries({queryKey: USER_ADDRESS_LIST});
      }

    }));

    return {
      mutate: mutation.mutate,
      isError: mutation.isError,
      isPending: mutation.isPending,
      isSuccess: mutation.isSuccess,
    };
  }
}
