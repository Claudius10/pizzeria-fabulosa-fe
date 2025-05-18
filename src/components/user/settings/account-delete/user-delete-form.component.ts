import {ChangeDetectionStrategy, Component, inject, OnDestroy, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth/auth.service';
import {Router} from '@angular/router';
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
import {injectMutation, QueryClient} from '@tanstack/angular-query-experimental';
import {lastValueFrom} from 'rxjs';
import {CartService} from '../../../../services/cart/cart.service';
import {CheckoutFormService} from '../../../../services/checkout/checkout-form.service';
import {UserAccountAPIService} from '../../../../api';

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
  private checkoutFormService = inject(CheckoutFormService);
  private accountHttpService = inject(UserAccountAPIService);
  private translateService = inject(TranslateService);
  private messageService = inject(MessageService);
  private errorService = inject(ErrorService);
  private queryClient = inject(QueryClient);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private delete = injectMutation(() => ({
    mutationFn: (data: { id: number, password: string }) => lastValueFrom(this.accountHttpService.deleteUser(data.id, data.password))
  }));

  protected showPassword = signal(false);

  protected togglePassword() {
    this.showPassword.set(!this.showPassword());
  }

  ngOnDestroy(): void {
    this.loadingAnimationService.stopLoading();
  }

  protected form = new FormGroup({
    password: new FormControl<string>("", {
      nonNullable: true,
      updateOn: "change",
      validators: [Validators.required]
    })
  });

  protected onSubmit() {
    if (isFormValid(this.form)) {
      this.loadingAnimationService.startLoading();

      this.delete.mutate({id: this.authService.userId!, password: this.form.get("password")!.value}, {
        onSuccess: () => {
          this.authService.logout();
          this.queryClient.removeQueries({queryKey: ["user"]});
          this.cartService.clear();
          this.checkoutFormService.clear();

          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant("toast.severity.info"),
            detail: this.translateService.instant("component.user.delete.form"),
            life: 2000
          });

          this.router.navigate(["/"]);

        },
        onError: (Error) => {
          console.log(Error);
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
