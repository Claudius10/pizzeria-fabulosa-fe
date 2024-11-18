import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {emailRgx, passwordRegex} from '../../../regex';
import {LoginService} from '../../../services/login/login.service';
import {LoginForm} from '../../../interfaces/forms/account';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private loginService = inject(LoginService);
  private login = this.loginService.login();

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

    this.login.mutate(data);
  }
}
