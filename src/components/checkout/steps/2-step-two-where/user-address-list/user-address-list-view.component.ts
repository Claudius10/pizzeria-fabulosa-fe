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
import {injectQuery} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {UserAddressAPIService} from '../../../../../api';
import {AuthService} from '../../../../../services/auth/auth.service';

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
  private userAddressAPI = inject(UserAddressAPIService);
  private errorService = inject(ErrorService);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  protected addressList = injectQuery(() => ({
    queryKey: USER_ADDRESS_LIST,
    queryFn: () => lastValueFrom(this.userAddressAPI.findUserAddressListById(this.authService.userId!))
  }));
  protected status = toObservable(this.addressList.status);

  ngOnInit(): void {
    const subscription = this.status.subscribe({
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

  protected selectAddress(id: number) {
    this.onAddressSelect.emit({id: id, isStore: false});
  }
}
