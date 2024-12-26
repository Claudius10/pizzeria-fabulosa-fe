import {ChangeDetectionStrategy, Component, inject, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AccountService} from '../../../../services/http/account/account.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {DeleteAccountForm} from '../../../../interfaces/http/account';
import {PaginatorModule} from 'primeng/paginator';
import {Router} from '@angular/router';
import {ApiError, MutationResult} from '../../../../interfaces/mutation';
import {ResponseDTO} from '../../../../interfaces/http/api';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {handleError, handleFatalError, handleServerNoResponse, isFormValid} from '../../../../utils/functions';
import {CardModule} from 'primeng/card';
import {LoadingAnimationService} from '../../../../services/navigation/loading-animation.service';
import {ErrorService} from '../../../../services/error/error.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import {UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-user-delete-form',
  standalone: true,
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
  styleUrl: './user-delete-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDeleteFormComponent implements OnDestroy {
  private router = inject(Router);
  private errorService = inject(ErrorService);
  private translateService = inject(TranslateService);
  private messageService = inject(MessageService);
  private loadingAnimationService = inject(LoadingAnimationService);
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private delete: MutationResult = this.accountService.delete();

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
        onSuccess: () => {
          this.authService.logout();
          this.router.navigate(["/"]);
        },
        onError: (error: Error) => {
          const apiError = error as ApiError;
          const response: ResponseDTO = apiError.error;

          // server response?
          if (response.status !== undefined) {
            // error?
            if (response.status.error) {
              // fatal error?
              if (response.error!.fatal) {
                handleFatalError(response, this.errorService, this.router);
              } else
                handleError(response, this.messageService, this.translateService);
            }
          } else {
            handleServerNoResponse(this.messageService, this.translateService);
          }
        },
        onSettled: () => {
          this.loadingAnimationService.stopLoading();
        }
      });
    }
  }
}
