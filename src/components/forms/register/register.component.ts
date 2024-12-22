import {ChangeDetectionStrategy, Component, inject, OnDestroy} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {emailRgx, esCharsRegex, passwordRegex} from '../../../regex';
import {RegisterForm} from '../../../interfaces/http/account';
import {AccountService} from '../../../services/http/account/account.service';
import {handleError, handleFatalError, isFormValid} from '../../../utils/functions';
import {Button} from 'primeng/button';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {AuthService} from '../../../services/auth/auth.service';
import {ApiError, MutationResult} from '../../../interfaces/mutation';
import {LoadingAnimationService} from '../../../services/navigation/loading-animation.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {ResponseDTO} from '../../../interfaces/http/api';
import {ErrorService} from '../../../services/error/error.service';
import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-register',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Button,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnDestroy {
  private router = inject(Router);
  protected authService = inject(AuthService);
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);
  private errorService = inject(ErrorService);
  private loadingAnimationService = inject(LoadingAnimationService);
  private accountService = inject(AccountService);
  private register: MutationResult = this.accountService.create();

  ngOnDestroy(): void {
    this.loadingAnimationService.stopLoading();
  }

  form = new FormGroup({
    name: new FormControl<string>("", {
      validators: [Validators.required, Validators.pattern(esCharsRegex)],
      nonNullable: true,
      updateOn: 'blur'
    }),
    email: new FormControl<string>("", {
      validators: [Validators.required, Validators.pattern(emailRgx)],
      nonNullable: true,
      updateOn: 'blur'
    }),
    matchingEmail: new FormControl<string>("", {
      validators: [Validators.required, Validators.pattern(emailRgx)],
      nonNullable: true,
      updateOn: 'blur'
    }),
    password: new FormControl<string>("", {
      validators: [Validators.required, Validators.pattern(passwordRegex)],
      nonNullable: true,
      updateOn: 'blur'
    }),
    matchingPassword: new FormControl<string>("", {
      validators: [Validators.required, Validators.pattern(passwordRegex)],
      nonNullable: true,
      updateOn: 'blur'
    })
  }, {validators: [validateEmailMatching, validatePasswordMatching]});

  cancel() {
    this.router.navigate(['/']);
  }

  public onSubmit(): void {
    if (isFormValid(this.form)) {
      this.loadingAnimationService.startLoading();

      const data: RegisterForm = {
        name: this.form.get("name")!.value,
        email: this.form.get("email")!.value,
        matchingEmail: this.form.get("matchingEmail")!.value,
        password: this.form.get("password")!.value,
        matchingPassword: this.form.get("matchingPassword")!.value
      };

      this.register.mutate({payload: data}, {
        onSuccess: () => {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant("form.register.success.summary"),
            detail: this.translateService.instant("form.register.success.detail"),
            life: 3000
          });
          this.router.navigate(["/"]);
        }, onError: (error: Error) => {
          const apiError = error as ApiError;
          const response: ResponseDTO = apiError.error;

          // did server respond?
          if (response.status !== undefined && response.status.error) {
            if (response.error!.fatal) {
              handleFatalError(response, this.errorService, this.router);
            } else
              handleError(response, this.messageService, this.translateService);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant("error.server.summary"),
              detail: this.translateService.instant("error.server.detail"),
              life: 3000
            });
          }
        }, onSettled: () => {
          this.loadingAnimationService.stopLoading();
        }
      });
    }
  }
}

const validateEmailMatching: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const email = control.get("email");
  const matchingEmail = control.get("matchingEmail");
  return email && matchingEmail && email.value === matchingEmail.value ? null : {valid: false};
};

const validatePasswordMatching: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get("password");
  const matchingPassword = control.get("matchingPassword");
  return password && matchingPassword && password.value === matchingPassword.value ? null : {valid: false};
};
