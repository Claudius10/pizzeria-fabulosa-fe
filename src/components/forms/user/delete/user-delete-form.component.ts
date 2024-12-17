import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
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
    CardModule
  ],
  templateUrl: './user-delete-form.component.html',
  styleUrl: './user-delete-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDeleteFormComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private delete: MutationResult = this.accountService.delete();

  form = new FormGroup({
    password: new FormControl<string>("", {
      nonNullable: true,
      updateOn: "blur",
      validators: [Validators.required]
    })
  });

  public onSubmit() {
    if (isFormValid(this.form)) {
      const data: DeleteAccountForm = {
        userId: this.authService.getUserId()!,
        password: this.form.get("password")!.value
      };

      this.delete.mutate({payload: data}, {
        onSuccess: (response: ResponseDTO) => {
          console.log(response);
          this.authService.logout();
          this.router.navigate(["/"]).catch(reason => {

          });
        },
        onError: () => {
        }
      });
    }
  }
}
