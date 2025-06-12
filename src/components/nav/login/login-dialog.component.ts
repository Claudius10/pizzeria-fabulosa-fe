import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Button, ButtonDirective} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {PrimeTemplate} from 'primeng/api';
import {TranslatePipe} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';
import {myIcon} from '../../../primeng/icon';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-login-dialog',
  imports: [
    TranslatePipe,
    UpperCasePipe,
    Button,
    ButtonDirective,
    Dialog,
    PrimeTemplate
  ],
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginDialogComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  protected visible: boolean = this.authService.loginDialogVisibility();  // provides hiding dialog on esc key press
  protected backEndClientBaseUri = environment.url;

  protected closeLoginDialog(): void {
    this.authService.loginDialogVisibility.set(false);
    this.visible = this.authService.loginDialogVisibility();
  }

  protected goToRegister(): void {
    this.closeLoginDialog();
    this.router.navigate(["/registration"]);
  }

  protected readonly myIcon = myIcon;
}
