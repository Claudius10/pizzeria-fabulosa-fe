import {ChangeDetectionStrategy, Component, inject, input, OnDestroy} from '@angular/core';
import {AddressDTO} from '../../../../../utils/interfaces/dto/order';
import {Button} from 'primeng/button';
import {ResponseDTO} from '../../../../../utils/interfaces/http/api';
import {LoadingAnimationService} from '../../../../../services/animation/loading-animation.service';
import {MutationRequest, MutationResult} from '../../../../../utils/interfaces/mutation';
import {TranslatePipe} from '@ngx-translate/core';
import {injectMutation, QueryClient} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {USER_ADDRESS_LIST} from '../../../../../utils/query-keys';
import {UserHttpService} from '../../../../../services/http/user/user-http.service';

@Component({
  selector: 'app-user-address-item',
  imports: [
    Button,
    TranslatePipe
  ],
  templateUrl: './user-address-item.component.html',
  styleUrl: './user-address-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAddressItemComponent implements OnDestroy {
  private loadingAnimationService = inject(LoadingAnimationService);
  private userHttpService = inject(UserHttpService);
  private queryClient = inject(QueryClient);
  private deleteUserAddress: MutationResult = injectMutation(() => ({
    mutationFn: (request: MutationRequest) => lastValueFrom(this.userHttpService.deleteUserAddress(request.payload)),
    onSuccess: () => {
      this.queryClient.refetchQueries({queryKey: USER_ADDRESS_LIST});
    }
  }));
  address = input.required<AddressDTO>();

  ngOnDestroy(): void {
    this.loadingAnimationService.stopLoading();
  }

  deleteAddress(id: number) {
    this.loadingAnimationService.startLoading();

    this.deleteUserAddress.mutate({payload: id.toString()}, {
      onSuccess: (response: ResponseDTO) => {
      },
      onError: () => {
      },
      onSettled: () => {
        this.loadingAnimationService.stopLoading();
      }
    });
  }
}
