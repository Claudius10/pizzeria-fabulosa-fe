import {ChangeDetectionStrategy, Component, inject, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {esCharsAndNumbersRegex, esCharsRegex, numbersRegex} from '../../../../../utils/regex';
import {AuthService} from '../../../../../services/auth/auth.service';
import {UserService} from '../../../../../services/http/user/user.service';
import {MutationResult, UserAddressMutationOptions} from '../../../../../interfaces/mutation';
import {isFormValid} from '../../../../../utils/functions';
import {AddressFormData} from '../../../../../interfaces/http/order';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {LoadingAnimationService} from '../../../../../services/navigation/loading-animation.service';
import {ResponseDTO} from '../../../../../interfaces/http/api';
import {ErrorService} from '../../../../../services/error/error.service';
import {TranslatePipe} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';
import {myInput} from '../../../../../primeng/input';
import {myIcon} from '../../../../../primeng/icon';

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
  private errorService = inject(ErrorService);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private createAddress: MutationResult = this.userService.createUserAddress();

  form = new FormGroup({
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

  cancel() {
    this.hideForm.emit();
  }

  onSubmit() {
    const userId = this.authService.userId!;
    if (isFormValid(this.form) && userId) {
      this.loadingAnimationService.startLoading();

      const form: AddressFormData = {
        id: null,
        street: this.form.get("street")!.value,
        number: Number(this.form.get("number")!.value),
        details: this.form.get("details")!.value === null ? null : this.form.get("details")!.value,
      };

      const payload: UserAddressMutationOptions = {
        userId: this.authService.userId!,
        data: form
      };

      this.createAddress.mutate({payload: payload}, {
        onSuccess: (response: ResponseDTO) => {
          if (response.status.error) {
            this.errorService.handleError(response);
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
