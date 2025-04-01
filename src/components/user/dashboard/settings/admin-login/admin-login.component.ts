import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Button} from "primeng/button";
import {Dialog} from "primeng/dialog";
import {AuthService} from '../../../../../services/common/auth/auth.service';
import {InputText} from 'primeng/inputtext';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {UpperCasePipe} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {myIcon} from '../../../../../primeng/icon';
import {myInput} from '../../../../../primeng/input';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-login',
  imports: [
    Button,
    Dialog,
    InputText,
    IconField,
    InputIcon,
    ReactiveFormsModule,
    TranslatePipe,
    UpperCasePipe
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLoginComponent {
  protected authService = inject(AuthService);
  private router = inject(Router);
  protected dialogVisible = false;
  protected showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  form = new FormGroup({
    password: new FormControl<string>("", {
      nonNullable: true,
      updateOn: "change",
      validators: [Validators.required]
    })
  });

  protected onSubmit() {

    // send post for admin privilege
    // if successful
    this.router.navigate(['/admin']);
    this.authService.isAuthedAsAdmin = true;
  }

  protected dialogVisibility(value: boolean) {
    this.dialogVisible = value;
    this.form.reset();
  }

  protected readonly myIcon = myIcon;
  protected readonly myInput = myInput;
}
