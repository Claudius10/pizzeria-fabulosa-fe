import {ChangeDetectionStrategy, Component, inject, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {MutationRequest, MutationResult} from '../../../../utils/interfaces/mutation';
import {ResponseDTO} from '../../../../utils/interfaces/http/api';
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
import {injectMutation} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {AccountHttpService} from '../../../../services/http/account/account-http.service';

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
  private accountHttpService = inject(AccountHttpService);
  private translateService = inject(TranslateService);
  private messageService = inject(MessageService);
  private errorService = inject(ErrorService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private delete: MutationResult = injectMutation(() => ({
    mutationFn: (request: MutationRequest) => lastValueFrom(this.accountHttpService.delete(request.payload))
  }));

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

      this.delete.mutate({payload: this.form.get("password")!.value}, {
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
