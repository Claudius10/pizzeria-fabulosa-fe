import {ChangeDetectionStrategy, Component, inject, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {esCharsAndNumbersRegex, esCharsRegex, numbersRegex} from '../../../../../utils/regex';
import {MutationRequest, MutationResult} from '../../../../../utils/interfaces/mutation';
import {isFormValid} from '../../../../../utils/functions';
import {AddressFormData} from '../../../../../utils/interfaces/http/order';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {LoadingAnimationService} from '../../../../../services/animation/loading-animation.service';
import {ResponseDTO} from '../../../../../utils/interfaces/http/api';
import {ErrorService} from '../../../../../services/error/error.service';
import {TranslatePipe} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';
import {myInput} from '../../../../../primeng/input';
import {myIcon} from '../../../../../primeng/icon';
import {injectMutation, QueryClient} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {USER_ADDRESS_LIST} from '../../../../../utils/query-keys';
import {UserHttpService} from '../../../../../services/http/user/user-http.service';

@Component({
  selector: 'app-user-address-form',
  imports: [
    ReactiveFormsModule,
    IconField,
    InputIcon,
    TranslatePipe,
    InputText,
    Button,
    UpperCasePipe
  ],
  templateUrl: './user-address-form.component.html',
  styleUrl: './user-address-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAddressFormComponent {
  hideForm = output();
  private loadingAnimationService = inject(LoadingAnimationService);
  private userHttpService = inject(UserHttpService);
  private errorService = inject(ErrorService);
  private queryClient = inject(QueryClient);

  private createAddress: MutationResult = injectMutation(() => ({
    mutationFn: (request: MutationRequest) => lastValueFrom(this.userHttpService.createUserAddress(request.payload)),
    onSuccess: () => {
      this.queryClient.refetchQueries({queryKey: USER_ADDRESS_LIST});
    }
  }));

  protected form = new FormGroup({
    id: new FormControl<number | null>(null),
    street: new FormControl("", {
        validators: [Validators.required, Validators.maxLength(52), Validators.pattern(esCharsRegex)],
        nonNullable: true,
        updateOn: "change"
      }
    ),
    number: new FormControl("", {
        validators: [Validators.required, Validators.maxLength(4), Validators.pattern(numbersRegex)],
        nonNullable: true,
        updateOn: "change"
      }
    ),
    details: new FormControl<string | null>(null, {
      validators: [Validators.pattern(esCharsAndNumbersRegex)],
      nonNullable: false,
      updateOn: "change"
    }),
  });

  protected cancel() {
    this.hideForm.emit();
  }

  protected onSubmit() {
    if (isFormValid(this.form)) {
      const data: AddressFormData = {
        id: null,
        street: this.form.get("street")!.value,
        number: Number(this.form.get("number")!.value),
        details: this.form.get("details")!.value === null ? null : this.form.get("details")!.value,
      };

      this.loadingAnimationService.startLoading();

      this.createAddress.mutate({payload: data}, {
        onSuccess: (response: ResponseDTO) => {
          if (response.status.error && response.error) {
            this.errorService.handleError(response.error);
          } else {
            this.hideForm.emit();
          }
        },
        onError: () => {
          this.errorService.handleServerNoResponse();
        },
        onSettled: () => {
          this.loadingAnimationService.stopLoading();
        }
      });
    }
  }

  protected readonly myInput = myInput;
  protected readonly myIcon = myIcon;
}
