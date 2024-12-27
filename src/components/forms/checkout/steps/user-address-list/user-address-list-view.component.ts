import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, output} from '@angular/core';
import {USER_ADDRESS_LIST} from '../../../../../utils/query-keys';
import {UserService} from '../../../../../services/http/user/user.service';
import {AuthService} from '../../../../../services/auth/auth.service';
import {CardModule} from 'primeng/card';
import {NgClass} from '@angular/common';
import {AddressId} from '../../../../../services/checkout/checkout-form.service';
import {TranslatePipe} from '@ngx-translate/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {ERROR, PENDING, SUCCESS} from '../../../../../utils/constants';
import {LoadingAnimationService} from '../../../../../services/navigation/loading-animation.service';
import {ErrorService} from '../../../../../services/error/error.service';
import {ServerErrorComponent} from '../../../../app/error/server-no-response/server-error.component';
import {ResponseDTO} from '../../../../../interfaces/http/api';

@Component({
  selector: 'app-user-address-list-view',
  standalone: true,
  imports: [
    CardModule,
    NgClass,
    TranslatePipe,
    ServerErrorComponent
  ],
  templateUrl: './user-address-list-view.component.html',
  styleUrl: './user-address-list-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAddressListViewComponent implements OnInit {
  onAddressSelect = output<AddressId>();
  selected = input<number | null>(null);
  valid = input<boolean>();
  private destroyRef = inject(DestroyRef);
  private loadingAnimationService = inject(LoadingAnimationService);
  private errorService = inject(ErrorService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  addressList = this.userService.findUserAddressList({
    queryKey: USER_ADDRESS_LIST,
    id: this.authService.getUserId()!
  });
  status = toObservable(this.addressList.status);

  ngOnInit(): void {
    const subscription = this.status.subscribe({
      next: status => {
        if (status === PENDING) {
          this.loadingAnimationService.startLoading();
        }

        if (status === ERROR) {
          this.loadingAnimationService.stopLoading();
        }

        if (status === SUCCESS) {
          this.loadingAnimationService.stopLoading();
          const response: ResponseDTO = this.addressList.data()!;

          if (response.status.error) {
            this.errorService.handleError(response);
          }
        }
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      this.loadingAnimationService.stopLoading();
    });
  }

  selectAddress(id: number) {
    this.onAddressSelect.emit({id: id, isStore: false});
  }
}
