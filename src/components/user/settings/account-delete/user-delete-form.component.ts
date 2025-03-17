import {ChangeDetectionStrategy, Component, inject, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AccountService} from '../../../../services/http/account/account.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {DeleteAccountForm} from '../../../../interfaces/http/account';
import {Router} from '@angular/router';
import {MutationResult} from '../../../../interfaces/mutation';
import {ResponseDTO} from '../../../../interfaces/http/api';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {isFormValid} from '../../../../utils/functions';
import {LoadingAnimationService} from '../../../../services/animation/loading-animation.service';
import {ErrorService} from '../../../../services/error/error.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';
import {MessageService} from 'primeng/api';
import {myInput} from '../../../../primeng/input';
import {myIcon} from '../../../../primeng/icon';

@Component({
  selector: 'app-user-delete-form',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    IconField,
    InputText,
    InputIcon,
    Button,
    UpperCasePipe,
  ],
  templateUrl: './user-delete-form.component.html',
  styleUrl: './user-delete-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDeleteFormComponent implements OnDestroy {
  private loadingAnimationService = inject(LoadingAnimationService);
  private translateService = inject(TranslateService);
  private messageService = inject(MessageService);
  private accountService = inject(AccountService);
  private errorService = inject(ErrorService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private delete: MutationResult = this.accountService.delete();
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  ngOnDestroy(): void {
    this.loadingAnimationService.stopLoading();
  }

  form = new FormGroup({
    password: new FormControl<string>("", {
      nonNullable: true,
      updateOn: "change",
      validators: [Validators.required]
    })
  });

  public onSubmit() {
    if (isFormValid(this.form)) {
      this.loadingAnimationService.startLoading();

      const data: DeleteAccountForm = {
        userId: this.authService.userId!,
        password: this.form.get("password")!.value
      };

      this.delete.mutate({payload: data}, {
        onSuccess: (response: ResponseDTO) => {
          if (response.status.error && response.error) {
            this.errorService.handleError(response.error);

          } else {
            this.authService.logout();

            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant("toast.severity.info"),
              detail: this.translateService.instant("component.user.delete.form"),
              life: 2000
            });

            this.router.navigate(["/"]);
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
  }

  protected readonly myInput = myInput;
  protected readonly myIcon = myIcon;
}
