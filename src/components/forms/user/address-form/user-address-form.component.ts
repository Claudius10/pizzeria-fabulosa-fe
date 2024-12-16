import {ChangeDetectionStrategy, Component, inject, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {esCharsAndNumbersRegex, esCharsRegex, numbersRegex} from '../../../../regex';
import {AuthService} from '../../../../services/auth/auth.service';
import {UserService} from '../../../../services/http/user/user.service';
import {MutationResult} from '../../../../interfaces/mutation';
import {isFormValid} from '../../../../utils/functions';
import {AddressFormData} from '../../../../interfaces/http/order';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-user-address-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    Button
  ],
  templateUrl: './user-address-form.component.html',
  styleUrl: './user-address-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAddressFormComponent {
  hideForm = output();
  private authService = inject(AuthService);
  private userService = inject(UserService);
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
        validators: [Validators.required, Validators.maxLength(10), Validators.pattern(numbersRegex)],
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
    if (isFormValid(this.form) && userId !== undefined) {
      const data: AddressFormData = {
        id: null,
        street: this.form.get("street")!.value,
        number: Number(this.form.get("number")!.value),
        details: this.form.get("details")!.value === null ? null : this.form.get("details")!.value,
      };

      this.createAddress.mutate({
        payload: {
          userId: this.authService.getUserId(),
          data: data
        }
      }, {
        onSuccess: (response) => {
          console.log(response);
          this.hideForm.emit();
        },
        onError: (error) => {
        }
      });
    }
  }
}
