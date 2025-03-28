import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, output} from '@angular/core';
import {USER_ADDRESS_LIST} from '../../../../../utils/query-keys';
import {NgClass} from '@angular/common';
import {AddressId} from '../../../../../services/checkout/checkout-form.service';
import {TranslatePipe} from '@ngx-translate/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {ERROR, PENDING, SUCCESS} from '../../../../../utils/constants';
import {LoadingAnimationService} from '../../../../../services/animation/loading-animation.service';
import {ErrorService} from '../../../../../services/error/error.service';
import {ServerErrorComponent} from '../../../../../app/routes/error/server-no-response/server-error.component';
import {ResponseDTO} from '../../../../../utils/interfaces/http/api';
import {QueryResult} from '../../../../../utils/interfaces/query';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {UserHttpService} from '../../../../../services/http/user/user-http.service';

@Component({
  selector: 'app-user-address-list-view',
  imports: [
    NgClass,
    TranslatePipe,
    ServerErrorComponent
  ],
  templateUrl: './user-address-list-view.component.html',
  styleUrl: './user-address-list-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAddressListViewComponent implements OnInit {
  onAddressSelect = output<AddressId>();
  selected = input<number | null>(null);
  invalid = input.required<boolean>();
  private loadingAnimationService = inject(LoadingAnimationService);
  private userHttpService = inject(UserHttpService);
  private destroyRef = inject(DestroyRef);
  private errorService = inject(ErrorService);
  addressList: QueryResult = injectQuery(() => ({
    queryKey: USER_ADDRESS_LIST,
    queryFn: () => lastValueFrom(this.userHttpService.findUserAddressList())
  }));
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

  selectAddress(id: number) {
    this.onAddressSelect.emit({id: id, isStore: false});
  }
}
