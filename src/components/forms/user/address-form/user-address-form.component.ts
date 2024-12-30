import {ChangeDetectionStrategy, Component, inject, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {esCharsAndNumbersRegex, esCharsRegex, numbersRegex} from '../../../../regex';
import {AuthService} from '../../../../services/auth/auth.service';
import {UserService} from '../../../../services/http/user/user.service';
import {MutationResult, UserAddressMutationOptions} from '../../../../interfaces/mutation';
import {isFormValid} from '../../../../utils/functions';
import {AddressFormData} from '../../../../interfaces/http/order';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {LoadingAnimationService} from '../../../../services/navigation/loading-animation.service';
import {ResponseDTO} from '../../../../interfaces/http/api';
import {ErrorService} from '../../../../services/error/error.service';
import {TranslatePipe} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';

@Component({
    selector: 'app-user-address-form',
    imports: [
        ReactiveFormsModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        Button,
        TranslatePipe,
        UpperCasePipe
    ],
    templateUrl: './user-address-form.component.html',
    styleUrl: './user-address-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAddressFormComponent {
  hideForm = output();
  private errorService = inject(ErrorService);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private loadingAnimationService = inject(LoadingAnimationService);
  private createAddress: MutationResult = this.userService.createUserAddress();

  form = new FormGroup({
    id: new FormControl<number | null>(null),
    street: new FormControl("", {
        validators: [Validators.required, Validators.maxLength(52), Validators.pattern(esCharsRegex)],
        nonNullable: true,
        updateOn: "blur"
      }
    ),
    number: new FormControl("", {
        validators: [Validators.required, Validators.maxLength(4), Validators.pattern(numbersRegex)],
        nonNullable: true,
        updateOn: "blur"
      }
    ),
    details: new FormControl<string | null>(null, {
      validators: [Validators.pattern(esCharsAndNumbersRegex)],
      nonNullable: false,
      updateOn: "blur"
    }),
  });

  cancel() {
    this.hideForm.emit();
  }

  onSubmit() {
    const userId = this.authService.getUserId();
    if (isFormValid(this.form) && userId) {
      this.loadingAnimationService.startLoading();

      const form: AddressFormData = {
        id: null,
        street: this.form.get("street")!.value,
        number: Number(this.form.get("number")!.value),
        details: this.form.get("details")!.value === null ? null : this.form.get("details")!.value,
      };

      const payload: UserAddressMutationOptions = {
        userId: this.authService.getUserId()!,
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
}
