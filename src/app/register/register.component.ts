import {ChangeDetectionStrategy, Component, inject, OnDestroy, signal} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {emailRgx, esCharsRegex, numbersRegex, passwordRegex} from '../../utils/regex';
import {isFormValid} from '../../utils/functions';
import {Button} from 'primeng/button';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {AuthService} from '../services/auth/auth.service';
import {LoadingAnimationService} from '../services/animation/loading-animation.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ErrorService} from '../services/error/error.service';
import {NgClass, NgIf, UpperCasePipe} from '@angular/common';
import {Card} from 'primeng/card';
import {myInput} from '../../primeng/input';
import {myIcon} from '../../primeng/icon';
import {injectMutation} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {RegisterAPIService, RegisterDTO} from '../../api/user';

@Component({

  selector: 'app-register',
  host: {
    class: 'upper-layout',
  },
  imports: [
    Card,
    ReactiveFormsModule,
    TranslatePipe,
    UpperCasePipe,
    IconField,
    InputIcon,
    InputText,
    Button,
    NgIf,
    NgClass
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnDestroy {
  private router = inject(Router);
  protected authService = inject(AuthService);
  private errorService = inject(ErrorService);
  private translateService = inject(TranslateService);
  private messageService = inject(MessageService);
  private loadingAnimationService = inject(LoadingAnimationService);
  private registerAPI = inject(RegisterAPIService);
  protected showPassword = signal(false);
  protected showMatchingPassword = signal(false);

  protected form = new FormGroup({
    name: new FormControl<string>("", {
      validators: [Validators.required, Validators.minLength(2), Validators.pattern(esCharsRegex)],
      nonNullable: true,
      updateOn: 'change'
    }),
    email: new FormControl<string>("", {
      validators: [Validators.required, Validators.pattern(emailRgx)],
      nonNullable: true,
      updateOn: 'change'
    }),
    matchingEmail: new FormControl<string>("", {
      validators: [Validators.required, Validators.pattern(emailRgx)],
      nonNullable: true,
      updateOn: 'change'
    }),
    contactNumber: new FormControl<string>("", {
      validators: [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(numbersRegex)],
      nonNullable: true,
      updateOn: 'change'
    }),
    password: new FormControl<string>("", {
      validators: [Validators.required, Validators.pattern(passwordRegex)],
      nonNullable: true,
      updateOn: 'change'
    }),
    matchingPassword: new FormControl<string>("", {
      validators: [Validators.required, Validators.pattern(passwordRegex)],
      nonNullable: true,
      updateOn: 'change'
    })
  }, {validators: [validatePasswordMatching, validateEmailMatching]});


  private register = injectMutation(() => ({
    mutationFn: (data: RegisterDTO) => lastValueFrom(this.registerAPI.registerAnonUser(data))
  }));

  ngOnDestroy(): void {
    this.loadingAnimationService.stopLoading();
  }

  protected togglePassword() {
    this.showPassword.set(!this.showPassword());
  }

  protected toggleMatchingPassword() {
    this.showMatchingPassword.set((!this.showMatchingPassword()));
  }

  protected cancel() {
    this.router.navigate(['/']);
  }

  protected showLoginDialog() {
    this.authService.loginDialogVisibility.set(true);
  }

  protected onSubmit(): void {
    if (isFormValid(this.form)) {
      this.loadingAnimationService.startLoading();

      const data: RegisterDTO = {
        name: this.form.get("name")!.value,
        email: this.form.get("email")!.value,
        matchingEmail: this.form.get("matchingEmail")!.value,
        contactNumber: Number(this.form.get("contactNumber")!.value),
        password: this.form.get("password")!.value,
        matchingPassword: this.form.get("matchingPassword")!.value
      };

      this.register.mutate(data, {
        onSuccess: () => {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant("toast.severity.info"),
            detail: this.translateService.instant("toast.form.register.success.detail"),
            life: 3000
          });

          this.router.navigate(["/"]);
        },
        onError: (error) => {
          this.errorService.handleError(error);
        },
        onSettled: () => {
          this.loadingAnimationService.stopLoading();
        }
      });
    }
  }

  protected readonly myInput = myInput;
  protected readonly myIcon = myIcon;
}

const validateEmailMatching: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const email = control.get("email");
  const matchingEmail = control.get("matchingEmail");
  const emailsMatching = email && matchingEmail && email.value === matchingEmail.value;
  return emailsMatching ? null : {emailsNotMatching: true};
};

const validatePasswordMatching: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get("password");
  const matchingPassword = control.get("matchingPassword");
  const matchingPasswords = password && matchingPassword && password.value === matchingPassword.value;
  return matchingPasswords ? null : {passwordsNotMatching: true};
};
