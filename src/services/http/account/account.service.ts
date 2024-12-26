import {inject, Injectable} from '@angular/core';
import {injectMutation} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {MutationRequest, MutationResult} from '../../../interfaces/mutation';
import {AccountHttpService} from './account-http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountHttpService = inject(AccountHttpService);

  public login(): MutationResult {
    const mutation = injectMutation(() => ({
      mutationFn: (request: MutationRequest) => lastValueFrom(this.accountHttpService.login(request.payload))
    }));

    return {
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      isPending: mutation.isPending
    };
  }

  public logout(): MutationResult {
    const mutation = injectMutation(() => ({
      mutationFn: (request: MutationRequest) => lastValueFrom(this.accountHttpService.logout())
    }));

    return {
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      isPending: mutation.isPending
    };
  }

  public create(): MutationResult {
    const mutation = injectMutation(() => ({
      mutationFn: (request: MutationRequest) => lastValueFrom(this.accountHttpService.create(request.payload))
    }));

    return {
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      isPending: mutation.isPending
    };
  }

  public delete(): MutationResult {
    const mutation = injectMutation(() => ({
      mutationFn: (request: MutationRequest) => lastValueFrom(this.accountHttpService.delete(request.payload))
    }));

    return {
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      isPending: mutation.isPending
    };
  }
}
