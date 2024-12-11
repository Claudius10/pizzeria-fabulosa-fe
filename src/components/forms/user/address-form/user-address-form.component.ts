import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {esCharsAndNumbersRegex, esCharsRegex, numbersRegex} from '../../../../regex';
import {AuthService} from '../../../../services/auth/auth.service';
import {UserService} from '../../../../services/http/user/user.service';
import {AddressFormData} from '../../../../interfaces/http/order';

@Component({
  selector: 'app-user-address-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-address-form.component.html',
  styleUrl: './user-address-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAddressFormComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private createAddress = this.userService.createUserAddress();

  form = new FormGroup({
    id: new FormControl<null>(null),
    street: new FormControl("", {
        validators: [Validators.required, Validators.pattern(esCharsRegex)],
        nonNullable: true,
        updateOn: "blur"
      }
    ),
    number: new FormControl("", {
        validators: [Validators.required, Validators.pattern(numbersRegex)],
        nonNullable: true,
        updateOn: "blur"
      }
    ),
    gate: new FormControl<string | null>(null, [Validators.pattern(esCharsAndNumbersRegex), Validators.maxLength(25)]),
    staircase: new FormControl<string | null>(null, [Validators.pattern(esCharsAndNumbersRegex), Validators.maxLength(25)]),
    floor: new FormControl<string | null>(null, [Validators.pattern(esCharsAndNumbersRegex), Validators.maxLength(25)]),
    door: new FormControl<string | null>(null, [Validators.pattern(esCharsAndNumbersRegex), Validators.maxLength(25)])
  });

  public onSubmit() {
    if (this.form.invalid) {
      // notification
      return;
    }

    const userId = this.authService.getUserId();

    if (userId === undefined) {
      // notification
      return;
    }

    const data: AddressFormData = {
      id: null,
      street: this.form.get("street")!.value,
      number: Number(this.form.get("number")!.value),
      details: ""
    };

    this.createAddress.mutate({userId: this.authService.getUserId(), data: data}, {
      onSuccess: () => {
      },
      onError: () => {
      }
    });
  }
}
