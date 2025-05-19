import {ChangeDetectionStrategy, Component, inject, input, OnDestroy} from '@angular/core';
import {Button} from 'primeng/button';
import {LoadingAnimationService} from '../../../../../services/animation/loading-animation.service';
import {TranslatePipe} from '@ngx-translate/core';
import {injectMutation, QueryClient} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {USER_ADDRESS_LIST} from '../../../../../utils/query-keys';
import {ErrorService} from '../../../../../services/error/error.service';
import {AddressDTO, UserAddressAPIService} from '../../../../../api';
import {AuthService} from '../../../../../services/auth/auth.service';

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
  address = input.required<AddressDTO>();
  private loadingAnimationService = inject(LoadingAnimationService);
  private userAddressAPI = inject(UserAddressAPIService);
  private errorService = inject(ErrorService);
  private authService = inject(AuthService);
  private queryClient = inject(QueryClient);

  private deleteUserAddress = injectMutation(() => ({
    mutationFn: (data: { addressId: number, userId: number }) => lastValueFrom(this.userAddressAPI.deleteUserAddress(data.addressId, data.userId)),
    onSuccess: () => {
      this.queryClient.refetchQueries({queryKey: USER_ADDRESS_LIST});
    }
  }));

  ngOnDestroy(): void {
    this.loadingAnimationService.stopLoading();
  }

  protected deleteAddress(id: number) {
    this.loadingAnimationService.startLoading();

    this.deleteUserAddress.mutate({addressId: id, userId: this.authService.userId!}, {
      onSuccess: () => {
      },
      onError: (error) => {
        this.errorService.handleError(error);
      },
      onSettled: () => {
        this.loadingAnimationService.stopLoading();
      }
    });
  }
}
