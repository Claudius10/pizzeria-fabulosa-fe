import {ChangeDetectionStrategy, Component, inject, OnDestroy} from '@angular/core';
import {Button} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {Router, RouterLink} from '@angular/router';
import {AccountService} from '../../../../services/http/account/account.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {emailRgx, passwordRegex} from '../../../../regex';
import {LoginForm} from '../../../../interfaces/forms/account';
import {InputTextModule} from 'primeng/inputtext';
import {AuthService} from '../../../../services/auth/auth.service';
import {LoginMutation} from '../../../../interfaces/mutation';
import {MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

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
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private login: LoginMutation = this.accountService.login();
  // visible provides hiding dialog on esc key press
  visible: boolean = this.authService.getIsLoginDialogVisible();

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

    const currentLang = this.translateService.currentLang;
    const successFeedbackMessage: string = currentLang === 'en' ? "Sign-in successful" : "Sesión iniciada con éxito";
    const errorFeedbackMessage: string = currentLang === 'en' ? "Sign-in unsuccessful" : "Error al iniciar la session";
    const summary: string = currentLang === 'en' ? "Account" : "Cuenta";

    this.login.mutate(data, {
      onSuccess: () => {
        this.messageService.add({severity: 'success', summary: summary, detail: successFeedbackMessage, life: 2000});
        this.closeDialog();
        this.router.navigate(["/pizzas"]);
      },
      onError: () => {
        this.messageService.add({severity: 'error', summary: summary, detail: errorFeedbackMessage, life: 2000});
      }
    });
  }

  closeDialog() {
    this.authService.setLoginDialog(false);
    this.visible = false;
  }
}
