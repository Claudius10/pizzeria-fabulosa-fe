import {inject, Injectable} from '@angular/core';
import {injectMutation, injectQuery} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {UserHttpService} from './user-http.service';
import {BaseUserQueryOptions, QueryResult} from '../../../interfaces/query';
import {MutationRequest, MutationResult} from '../../../interfaces/mutation';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userHttpService = inject(UserHttpService);

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
    }));

    return {
      mutate: mutation.mutate,
      isError: mutation.isError,
      isPending: mutation.isPending,
      isSuccess: mutation.isSuccess,
    };
  }
}
