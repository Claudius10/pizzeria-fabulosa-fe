import {ChangeDetectionStrategy, Component, inject, OnDestroy} from '@angular/core';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {Router} from '@angular/router';
import {AccountService} from '../../../services/http/account/account.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginForm} from '../../../interfaces/http/account';
import {AuthService} from '../../../services/auth/auth.service';
import {MutationResult} from '../../../interfaces/mutation';
import {MessageService, PrimeTemplate} from 'primeng/api';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {LoadingAnimationService} from '../../../services/animation/loading-animation.service';
import {CartService} from '../../../services/cart/cart.service';
import {ErrorService} from '../../../services/error/error.service';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {NgIf, UpperCasePipe} from '@angular/common';
import {SsrCookieService} from 'ngx-cookie-service-ssr';
import {isFormValid} from '../../../utils/functions';
import {CheckoutFormService} from '../../../services/checkout/checkout-form.service';
import {myIcon} from '../../../primeng/icon';
import {COOKIE_ID_TOKEN} from '../../../utils/constants';
import {emailRgx} from '../../../utils/regex';
import {ResponseDTO} from '../../../interfaces/http/api';

@Component({
  selector: 'app-login-dialog',
  imports: [
    Dialog,
    PrimeTemplate,
    ReactiveFormsModule,
    IconField,
    InputIcon,
    Button,
    TranslatePipe,
    UpperCasePipe,
    NgIf
  ],
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginDialogComponent implements OnDestroy {
  private loadingAnimationService = inject(LoadingAnimationService);
  private checkoutFormService = inject(CheckoutFormService);
  private translateService = inject(TranslateService);
  private cookieService = inject(SsrCookieService);
  private messageService = inject(MessageService);
  private accountService = inject(AccountService);
  private errorService = inject(ErrorService);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private login: MutationResult = this.accountService.login();
  showPassword = false;
  // visible provides hiding dialog on esc key press
  visible: boolean = this.authService.loginDialog;

  form = new FormGroup({
    email: new FormControl<string>("", {
      validators: [Validators.required, Validators.pattern(emailRgx)],
      nonNullable: true,
      updateOn: 'change'
    }),
    password: new FormControl<string>("", {
      validators: [Validators.required],
      nonNullable: true,
      updateOn: 'change'
    }),
  });

  ngOnDestroy(): void {
    this.loadingAnimationService.stopLoading();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  closeLoginDialog(): void {
    this.authService.loginDialog = false;
    this.visible = false;
  }

  goToRegister(): void {
    this.closeLoginDialog();
    this.router.navigate(["/registration"]);
  }

  dummySignIn() {
    this.signIn(null);
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

  signIn(data: LoginForm | null): void {
    this.loadingAnimationService.startLoading();

    this.login.mutate({payload: data}, {
      onSuccess: (response: ResponseDTO) => {
        // NOTE: successful login does not return responseDTO, but fail, such as BadCredentialsException, does

        if (response && response.status.error && response.error) {
          this.errorService.handleError(response.error);
        } else {
          this.cartService.clear();
          this.checkoutFormService.clear();

          const result = this.authService.authenticate(this.cookieService.get(COOKIE_ID_TOKEN));

          if (result) {
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant("toast.severity.info"),
              detail: this.translateService.instant("toast.form.login.success.detail"),
              life: 3000,
            });

            this.closeLoginDialog();
            this.router.navigate(["/"]);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant("toast.severity.error"),
              detail: this.translateService.instant("toast.error.api.token.invalid"),
              life: 3000,
            });
          }
        }
      },
      onError: () => {
        this.errorService.handleServerNoResponse();
      },
      onSettled: () => {
        this.loadingAnimationService.stopLoading();
      }
    });
  }

  protected readonly myIcon = myIcon;
}
