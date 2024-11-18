import {inject, Injectable} from '@angular/core';
import {RegisterForm} from '../../interfaces/forms/account';
import {RegisterHttpService} from './register-http.service';
import {injectMutation} from '@tanstack/angular-query-experimental';
import {firstValueFrom} from 'rxjs';
import {RegisterMutation} from '../../interfaces/mutation';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private registerHttpService = inject(RegisterHttpService);

  public createNewUser() {
    const mutation = injectMutation(() => ({
      mutationFn: (data: RegisterForm) => firstValueFrom(this.registerHttpService.registerNewUser(data))
    }));

    const mutationResult: RegisterMutation = {
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      isPending: mutation.isPending
    };

    return mutationResult;
  }
}
