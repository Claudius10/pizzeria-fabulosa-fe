import {ChangeDetectionStrategy, Component, inject, OnDestroy, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth/auth.service';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {isFormValid, logout} from '../../../../utils/functions';
import {LoadingAnimationService} from '../../../../services/animation/loading-animation.service';
import {ErrorService} from '../../../../services/error/error.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';
import {MessageService} from 'primeng/api';
import {myInput} from '../../../../primeng/input';
import {myIcon} from '../../../../primeng/icon';
import {injectMutation, QueryClient} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {CheckoutFormService} from '../../../../services/checkout/checkout-form.service';
import {UserAccountAPIService} from '../../../../api/user';

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
  protected showPassword = signal(false);
  protected form = new FormGroup({
    password: new FormControl<string>("", {
      nonNullable: true,
      updateOn: "change",
      validators: [Validators.required]
    })
  });
  protected readonly myInput = myInput;
  protected readonly myIcon = myIcon;
  private loadingAnimationService = inject(LoadingAnimationService);
  private checkoutFormService = inject(CheckoutFormService);
  private userAccountAPI = inject(UserAccountAPIService);
  private translateService = inject(TranslateService);
  private messageService = inject(MessageService);
  private errorService = inject(ErrorService);
  private queryClient = inject(QueryClient);
  private authService = inject(AuthService);
  private delete = injectMutation(() => ({
    mutationFn: (data: { id: number, password: string }) => lastValueFrom(this.userAccountAPI.deleteById(data.id, data.password))
  }));

  ngOnDestroy(): void {
    this.loadingAnimationService.stopLoading();
  }

  protected togglePassword() {
    this.showPassword.set(!this.showPassword());
  }

  protected onSubmit() {
    if (isFormValid(this.form)) {
      this.loadingAnimationService.startLoading();

      this.delete.mutate({id: this.authService.id!, password: this.form.get("password")!.value}, {
        onSuccess: () => {
          this.authService.logout();
          this.queryClient.removeQueries({queryKey: ["user"]});
          this.checkoutFormService.clear();

          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant("toast.severity.info"),
            detail: this.translateService.instant("component.user.delete.form"),
            life: 1000
          });

          setTimeout(() => {
            logout();
          }, 1000);
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
}
