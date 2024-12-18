import {ChangeDetectionStrategy, Component, inject, OnDestroy} from '@angular/core';
import {Button} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {Router} from '@angular/router';
import {AccountService} from '../../../../services/http/account/account.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {emailRgx, passwordRegex} from '../../../../regex';
import {LoginForm} from '../../../../interfaces/http/account';
import {InputTextModule} from 'primeng/inputtext';
import {AuthService} from '../../../../services/auth/auth.service';
import {MutationResult} from '../../../../interfaces/mutation';
import {MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {isFormValid} from '../../../../utils/functions';
import {LoadingAnimationService} from '../../../../services/navigation/loading-animation.service';
import {CartService} from '../../../../services/cart/cart.service';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    Button,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  templateUrl: './login-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginDialogComponent implements OnDestroy {
  private router = inject(Router);
  private loadingAnimationService = inject(LoadingAnimationService);
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private cartService = inject(CartService);
  private login: MutationResult = this.accountService.login();
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
    this.loadingAnimationService.stopLoading();
  }

  public onSubmit(): void {
    if (isFormValid(this.form)) {
      this.loadingAnimationService.startLoading();

      const currentLang = this.translateService.currentLang;
      const successFeedbackMessage: string = currentLang === 'en' ? "Sign-in successful" : "Sesión iniciada con éxito";
      const errorFeedbackMessage: string = currentLang === 'en' ? "Sign-in unsuccessful" : "Error al iniciar la session";
      const summary: string = currentLang === 'en' ? "Account" : "Cuenta";

      const data: LoginForm = {
        email: this.form.get("email")!.value,
        password: this.form.get("password")!.value,
      };

      this.login.mutate({payload: data}, {
        onSuccess: () => {
          this.messageService.add({severity: 'success', summary: summary, detail: successFeedbackMessage, life: 2000});
          this.closeDialog();
          this.cartService.clear();
          this.router.navigate(["/pizzas"]);
        },
        onError: () => {
          this.messageService.add({severity: 'error', summary: summary, detail: errorFeedbackMessage, life: 2000});
        },
        onSettled: () => {
          this.loadingAnimationService.stopLoading();
        }
      });
    }
  }

  closeDialog(): void {
    this.authService.setLoginDialog(false);
    this.visible = false;
  }

  goToRegister(): void {
    this.closeDialog();
    this.router.navigate(["/registration"]);
  }
}
