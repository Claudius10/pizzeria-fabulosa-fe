import {ChangeDetectionStrategy, Component, inject, OnDestroy, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {Router} from '@angular/router';
import {AccountService} from '../../../services/http/account/account.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {emailRgx, passwordRegex} from '../../../regex';
import {LoginForm} from '../../../interfaces/http/account';
import {AuthService} from '../../../services/auth/auth.service';
import {ApiError, MutationResult} from '../../../interfaces/mutation';
import {MessageService} from 'primeng/api';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {handleError, handleFatalError, isFormValid} from '../../../utils/functions';
import {LoadingAnimationService} from '../../../services/navigation/loading-animation.service';
import {CartService} from '../../../services/cart/cart.service';
import {ErrorService} from '../../../services/error/error.service';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {ResponseDTO} from '../../../interfaces/http/api';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    IconFieldModule,
    InputIconModule,
    Button,
    TranslatePipe
  ],
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginDialogComponent implements OnDestroy {
  private router = inject(Router);
  private errorService = inject(ErrorService);
  private loadingAnimationService = inject(LoadingAnimationService);
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private cartService = inject(CartService);
  private login: MutationResult = this.accountService.login();
  showPassword = signal(false);
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

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }

  closeLoginDialog(): void {
    this.authService.setLoginDialog(false);
    this.visible = false;
  }

  goToRegister(): void {
    this.closeLoginDialog();
    this.router.navigate(["/registration"]);
  }

  public onSubmit(): void {
    if (isFormValid(this.form)) {
      this.loadingAnimationService.startLoading();

      const data: LoginForm = {
        email: this.form.get("email")!.value,
        password: this.form.get("password")!.value,
      };

      this.login.mutate({payload: data}, {
        onSuccess: () => {
          this.closeLoginDialog();
          this.cartService.clear();
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant("form.login.success.summary"),
            detail: this.translateService.instant("form.login.success.detail"),
            life: 3000
          });
          this.router.navigate(["/pizzas"]);
        },
        onError: (error) => {
          const apiError = error as ApiError;
          const response: ResponseDTO = apiError.error;

          if (response.status.isError) {
            if (response.error!.fatal) {
              handleFatalError(response, this.errorService, this.router);
            } else
              handleError(response, this.messageService, this.translateService);
          }

        },
        onSettled: () => {
          this.loadingAnimationService.stopLoading();
        }
      });
    }
  }
}
