import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {USER_ADDRESS_LIST} from '../../../../../utils/query-keys';
import {Button} from 'primeng/button';
import {UserAddressFormComponent} from '../address-form/user-address-form.component';
import {UserAddressItemComponent} from '../user-address-item/user-address-item.component';
import {LoadingAnimationService} from '../../../../../services/animation/loading-animation.service';
import {toObservable} from '@angular/core/rxjs-interop';
import {ERROR, PENDING, SUCCESS} from '../../../../../utils/constants';
import {ServerErrorComponent} from '../../../../../app/routes/error/server-no-response/server-error.component';
import {ErrorService} from '../../../../../services/error/error.service';
import {TranslatePipe} from '@ngx-translate/core';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {AuthService} from '../../../../../services/auth/auth.service';
import {UserAddressAPIService} from '../../../../../api';

@Component({
  selector: 'app-user-address-list',
  imports: [
    UserAddressItemComponent,
    ServerErrorComponent,
    UserAddressFormComponent,
    Button,
    TranslatePipe
  ],
  templateUrl: './user-address-list.component.html',
  styleUrl: './user-address-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAddressListComponent implements OnInit {
  private loadingAnimationService = inject(LoadingAnimationService);
  private userAddressAPI = inject(UserAddressAPIService);
  private errorService = inject(ErrorService);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  protected addressList = injectQuery(() => ({
    queryKey: USER_ADDRESS_LIST,
    queryFn: () => lastValueFrom(this.userAddressAPI.findUserAddressListById(Number(this.authService.userId!)))
  }));

  private addressListStatus = toObservable(this.addressList.status);

  protected showAddressForm = signal(false);

  ngOnInit(): void {
    const subscription = this.addressListStatus.subscribe({
      next: status => {
        if (status === PENDING) {
          this.loadingAnimationService.startLoading();
        }

        if (status === ERROR) {
          this.loadingAnimationService.stopLoading();
          this.errorService.handleError(this.addressList.error()!);
        }

        if (status === SUCCESS) {
          this.loadingAnimationService.stopLoading();
        }
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      this.loadingAnimationService.stopLoading();
    });
  }

  protected toggleAddressForm() {
    this.showAddressForm.set(!this.showAddressForm());
  }

  protected hideFormOnCancel() {
    this.showAddressForm.set(false);
  }
}
