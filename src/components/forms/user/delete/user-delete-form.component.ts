import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {passwordRegex} from '../../../../regex';
import {AccountService} from '../../../../services/http/account/account.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {DeleteAccountForm} from '../../../../interfaces/http/account';
import {PaginatorModule} from 'primeng/paginator';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-delete-form',
  standalone: true,
  imports: [
    PaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-delete-form.component.html',
  styleUrl: './user-delete-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDeleteFormComponent {
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private router = inject(Router);
  private delete = this.accountService.delete();

  form = new FormGroup({
    password: new FormControl<string>("", {
      nonNullable: true,
      updateOn: "blur",
      validators: [Validators.pattern(passwordRegex)]
    })
  });

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      // notification
      return;
    }

    const data: DeleteAccountForm = {
      userId: this.authService.getUserId(),
      password: this.form.get("password")!.value
    };

    this.delete.mutate(data, {
      onSuccess: () => {
        // notification
        this.authService.logout();
        this.router.navigate(["/"]).catch(reason => {

        });
      },
      onError: () => {
      }
    });
  }
}
