import {ChangeDetectionStrategy, Component, inject, input, OnDestroy} from '@angular/core';
import {AddressDTO} from '../../../../../interfaces/dto/order';
import {Button} from 'primeng/button';
import {UserService} from '../../../../../services/http/user/user.service';
import {ResponseDTO} from '../../../../../interfaces/http/api';
import {AuthService} from '../../../../../services/auth/auth.service';
import {LoadingAnimationService} from '../../../../../services/navigation/loading-animation.service';
import {MutationResult, UserAddressDeleteMutationOptions} from '../../../../../interfaces/mutation';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
    selector: 'app-user-address-item',
    imports: [
        Button,
        TranslatePipe
    ],
    templateUrl: './user-address-item.component.html',
    styleUrl: './user-address-item.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAddressItemComponent implements OnDestroy {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private deleteUserAddress: MutationResult = this.userService.deleteUserAddress();
  private loadingAnimationService = inject(LoadingAnimationService);
  address = input.required<AddressDTO>();

  ngOnDestroy(): void {
    this.loadingAnimationService.stopLoading();
  }

  deleteAddress(id: number) {
    this.loadingAnimationService.startLoading();

    const payload: UserAddressDeleteMutationOptions = {
      userId: this.authService.getUserId()!,
      addressId: id.toString()
    };

    this.deleteUserAddress.mutate({
      payload: payload
    }, {
      onSuccess: (response: ResponseDTO) => {
        console.log(response);
      },
      onError: () => {
      },
      onSettled: () => {
        this.loadingAnimationService.stopLoading();
      }
    });
  }
}
