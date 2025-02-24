import {ChangeDetectionStrategy, Component, inject, OnDestroy, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {Router} from '@angular/router';
import {AccountService} from '../../../services/http/account/account.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {emailRgx, passwordRegex} from '../../../regex';
import {LoginForm} from '../../../interfaces/http/account';
import {AuthService} from '../../../services/auth/auth.service';
import {MutationResult} from '../../../interfaces/mutation';
import {MessageService} from 'primeng/api';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {LoadingAnimationService} from '../../../services/navigation/loading-animation.service';
import {CartService} from '../../../services/cart/cart.service';
import {ErrorService} from '../../../services/error/error.service';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {ResponseDTO} from '../../../interfaces/http/api';
import {UpperCasePipe} from '@angular/common';
import {SsrCookieService} from 'ngx-cookie-service-ssr';
import {isFormValid} from '../../../utils/functions';
import {CheckoutFormService} from '../../../services/checkout/checkout-form.service';
import {myIcon} from '../../../primeng/icon';

@Component({
  selector: 'app-login-dialog',
  imports: [
    DialogModule,
    ReactiveFormsModule,
    TranslatePipe,
    IconFieldModule,
    InputIconModule,
    Button,
    UpperCasePipe
  ],
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginDialogComponent implements OnDestroy {
  private router = inject(Router);
  private cookieService = inject(SsrCookieService);
  private errorService = inject(ErrorService);
  private loadingAnimationService = inject(LoadingAnimationService);
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private cartService = inject(CartService);
  private checkoutFormService = inject(CheckoutFormService);
  private login: MutationResult = this.accountService.login();
  showPassword = signal(false);
  // visible provides hiding dialog on esc key press
  visible: boolean = this.authService.getIsLoginDialogVisible();

  form = new FormGroup({
    email: new FormControl<string>("", {
      validators: [Validators.required, Validators.pattern(emailRgx)],
      nonNullable: true,
      updateOn: 'blur'
    }),
    password: new FormControl<string>("", {
      validators: [Validators.required, Validators.pattern(passwordRegex)],
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

  dummySignIn() {
    this.signIn(null);
  }

  signIn(data: LoginForm | null): void {
    this.loadingAnimationService.startLoading();
    this.login.mutate({payload: data}, {
      onSuccess: (response: ResponseDTO) => {
        if (response && response.status.error) {
          this.errorService.handleError(response);
        } else {
          this.cartService.clear();
          this.checkoutFormService.clear();
          this.authService.setUserCredentials(this.cookieService.get("idToken"));
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant("toast.severity.info"),
            detail: this.translateService.instant("toast.form.login.success.detail"),
            life: 3000,
          });
        }
      },
      onError: () => {
        this.errorService.handleServerNoResponse();
      },
      onSettled: () => {
        this.loadingAnimationService.stopLoading();
        this.closeLoginDialog();
      }
    });
  }

  public onSubmit(): void {
    if (isFormValid(this.form)) {
      const data: LoginForm = {
        email: this.form.get("email")!.value,
        password: this.form.get("password")!.value,
      };

      this.signIn(data);
    }
  }

  protected readonly myIcon = myIcon;
}
