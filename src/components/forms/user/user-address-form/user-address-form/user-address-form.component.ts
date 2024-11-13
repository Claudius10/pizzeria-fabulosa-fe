import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {esCharsAndNumbersRegex, esCharsRegex, numbersRegex} from '../../../../../regex';
import {AuthService} from '../../../../../services/auth/auth.service';
import {AddressService} from '../../../../../services/address/address.service';

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
  private addressService = inject(AddressService);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

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

    const sub = this.addressService.createAddress(userId, {
      id: null,
      street: this.form.get("street")!.value,
      streetNr: Number(this.form.get("number")!.value),
      gate: this.form.get("gate")!.value === null ? null : this.form.get("gate")!.value,
      staircase: this.form.get("staircase")!.value === null ? null : this.form.get("staircase")!.value,
      floor: this.form.get("floor")!.value === null ? null : this.form.get("floor")!.value,
      door: this.form.get("door")!.value === null ? null : this.form.get("door")!.value,
    }).subscribe();

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}
