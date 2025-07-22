import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, model, OnInit, output, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {TranslatePipe} from '@ngx-translate/core';
import {myIcon} from '../../../primeng/icon';
import {myInput} from '../../../primeng/input';
import {isFormValid} from '../../../utils/functions';
import {Dialog} from 'primeng/dialog';
import {toObservable} from '@angular/core/rxjs-interop';
import {UserAccountAPIService} from '../../../api/user';
import {injectMutation} from '@tanstack/angular-query-experimental';
import {AuthService} from '../../services/auth/auth.service';
import {lastValueFrom} from 'rxjs';
import {LoadingAnimationService} from '../../services/animation/loading-animation.service';
import {ErrorService} from '../../services/error/error.service';

@Component({
  selector: 'app-password-authorization',
  imports: [
    Button,
    FormsModule,
    IconField,
    InputIcon,
    InputText,
    ReactiveFormsModule,
    TranslatePipe,
    Dialog
  ],
  templateUrl: './password-authorization.component.html',
  styleUrl: './password-authorization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordAuthorizationComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private errorService = inject(ErrorService);
  private authService = inject(AuthService);
  private loadingAnimationService = inject(LoadingAnimationService);
  private userAccountAPIService = inject(UserAccountAPIService);
  private userId = this.authService.getId();
  protected showPassword = signal(false);
  title = input.required<string>();
  action = input.required<string>();
  guestAction = input.required<boolean>();
  show = model<boolean>(false);
  password = output<string>();
  showObservable = toObservable(this.show);
  isVisible = false;

  private checkPassword = injectMutation(() => ({
    mutationFn: (data: { id: number, password: string }) => lastValueFrom(this.userAccountAPIService.passwordMatches(data.id, data.password))
  }));

  ngOnInit(): void {
    const subscription = this.showObservable.subscribe(value => {
      this.isVisible = value;
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      this.isVisible = false;
    });
  }

  protected form = new FormGroup({
    password: new FormControl<string>("", {
      nonNullable: true,
      updateOn: "change",
      validators: [Validators.required]
    })
  });

  protected togglePassword() {
    this.showPassword.set(!this.showPassword());
  }

  protected authorizeAsGuest() {
    this.passwordCheck("Password1");
  }

  protected closeDialog() {
    this.show.set(false);
  }

  protected onSubmit() {
    if (isFormValid(this.form)) {
      const password = this.form.get("password")!.value;
      this.passwordCheck(password);
    }
  }

  private passwordCheck(password: string) {
    this.loadingAnimationService.startLoading();

    this.checkPassword.mutate({id: this.userId()!, password: password}, {
      onSuccess: () => {
        this.password.emit(password);
        this.closeDialog();
      },
      onError: (error) => {
        this.errorService.handleError(error);
      },
      onSettled: () => {
        this.loadingAnimationService.stopLoading();
      }
    });
  }

  protected readonly myIcon = myIcon;
  protected readonly myInput = myInput;
}
