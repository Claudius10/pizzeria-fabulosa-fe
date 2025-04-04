import {UserAddressItemComponent} from '../user-address-item/user-address-item.component';
import {ServerErrorComponent} from '../../../../../../app/routes/error/server-no-response/server-error.component';
import {UserAddressFormComponent} from '../address-form/user-address-form.component';
import {Button} from 'primeng/button';
import {TranslatePipe} from '@ngx-translate/core';
import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {LoadingAnimationService} from '../../../../../../services/common/animation/loading-animation.service';
import {UserHttpService} from '../../../../../../services/user/http/user/user-http.service';
import {ErrorService} from '../../../../../../services/common/error/error.service';
import {QueryResult} from '../../../../../../utils/interfaces/query';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {USER_ADDRESS_LIST} from '../../../../../../utils/query-keys';
import {lastValueFrom} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {ERROR, PENDING, SUCCESS} from '../../../../../../utils/constants';
import {ResponseDTO} from '../../../../../../utils/interfaces/http/api';

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
  private userHttpService = inject(UserHttpService);
  private errorService = inject(ErrorService);
  private destroyRef = inject(DestroyRef);

  protected addressList: QueryResult = injectQuery(() => ({
    queryKey: USER_ADDRESS_LIST,
    queryFn: () => lastValueFrom(this.userHttpService.findUserAddressList())
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
        }

        if (status === SUCCESS) {
          this.loadingAnimationService.stopLoading();
          const response: ResponseDTO = this.addressList.data()!;

          if (response.status.error && response.error) {
            this.errorService.handleError(response.error);
          }
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
