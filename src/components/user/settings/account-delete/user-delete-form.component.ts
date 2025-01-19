import {ChangeDetectionStrategy, Component, inject, OnDestroy, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AccountService} from '../../../../services/http/account/account.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {DeleteAccountForm} from '../../../../interfaces/http/account';
import {PaginatorModule} from 'primeng/paginator';
import {Router} from '@angular/router';
import {MutationResult} from '../../../../interfaces/mutation';
import {ResponseDTO} from '../../../../interfaces/http/api';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {isFormValid} from '../../../../utils/functions';
import {CardModule} from 'primeng/card';
import {LoadingAnimationService} from '../../../../services/navigation/loading-animation.service';
import {ErrorService} from '../../../../services/error/error.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';
import {formIconColor} from '../../../../primeng/icon';
import {MessageService} from 'primeng/api';
import {myInput} from '../../../../primeng/input';

@Component({
  selector: 'app-user-delete-form',
  imports: [
    PaginatorModule,
    ReactiveFormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    Button,
    CardModule,
    TranslatePipe,
    UpperCasePipe
  ],
  templateUrl: './user-delete-form.component.html',
  styleUrl: './user-delete-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDeleteFormComponent implements OnDestroy {
  private loadingAnimationService = inject(LoadingAnimationService);
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);
  private router = inject(Router);
  private errorService = inject(ErrorService);
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private delete: MutationResult = this.accountService.delete();
  showPassword = signal(false);

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }

  ngOnDestroy(): void {
    this.loadingAnimationService.stopLoading();
  }

  form = new FormGroup({
    password: new FormControl<string>("", {
      nonNullable: true,
      updateOn: "blur",
      validators: [Validators.required]
    })
  });

  public onSubmit() {
    if (isFormValid(this.form)) {
      this.loadingAnimationService.startLoading();

      const data: DeleteAccountForm = {
        userId: this.authService.getUserId()!,
        password: this.form.get("password")!.value
      };

      this.delete.mutate({payload: data}, {
        onSuccess: (response: ResponseDTO) => {
          if (response.status.error) {
            this.errorService.handleError(response);
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

  protected readonly formIconColor = formIconColor;
  protected readonly myInput = myInput;
}
