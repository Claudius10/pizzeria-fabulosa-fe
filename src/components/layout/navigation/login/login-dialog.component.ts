import {ChangeDetectionStrategy, Component, inject, OnDestroy} from '@angular/core';
import {Button} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {Router, RouterLink} from '@angular/router';
import {AccountService} from '../../../../services/http/account/account.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {emailRgx, passwordRegex} from '../../../../regex';
import {LoginForm} from '../../../../interfaces/forms/account';
import {InputTextModule} from 'primeng/inputtext';
import {LoginDialogService} from './service/login-dialog.service';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    Button,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    RouterLink
  ],
  templateUrl: './login-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginDialogComponent implements OnDestroy {
  private router = inject(Router);
  private loginDialogService = inject(LoginDialogService);
  private accountService = inject(AccountService);
  private login = this.accountService.login();
  visible = this.loginDialogService.getIsVisible();

  form = new FormGroup({
    email: new FormControl<string>("", {
      validators: [Validators.pattern(emailRgx)],
      nonNullable: true,
      updateOn: 'blur'
    }),
    password: new FormControl<string>("", {
      validators: [Validators.pattern(passwordRegex)],
      nonNullable: true,
      updateOn: 'blur'
    }),
  });

  ngOnDestroy(): void {
    this.form.reset();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log(this.form.controls);
      return;
    }

    const data: LoginForm = {
      email: this.form.get("email")!.value,
      password: this.form.get("password")!.value,
    };

    this.login.mutate(data, {
      onSuccess: () => {
        // notification
        this.router.navigate(["/menu/pizzas"]);
      },
      onError: () => {
      }
    });
  }

  closeDialog() {
    this.loginDialogService.setVisible(false);
    this.visible = false;
  }
}
