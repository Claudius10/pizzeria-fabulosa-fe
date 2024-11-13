import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {emailRgx, passwordRegex} from '../../../regex';
import {LoginService} from '../../../services/login/login.service';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from '../../../services/auth/auth.service';

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
  private authService = inject(AuthService);
  private cookieService = inject(CookieService);
  private destroyRef = inject(DestroyRef);

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

    const sub = this.loginService.login({
      email: this.form.get("email")!.value,
      password: this.form.get("password")!.value,
    }).subscribe({
      next: value => {
        console.log("response: ", value);
        this.authService.setUserCredentials(this.cookieService.get("idToken"));

      },
      error: error => {
        console.log("error: ", error.error);
      }
    });

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}
