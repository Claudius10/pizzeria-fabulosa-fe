import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Button, ButtonDirective} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {Router} from '@angular/router';
import {PrimeTemplate} from 'primeng/api';
import {TranslatePipe} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';
import {myIcon} from '../../../primeng/icon';
import {environment} from '../../../environments/environment';
import {RenderService} from '../../services/ui/render.service';

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
  private readonly router = inject(Router);
  private readonly renderService = inject(RenderService);
  protected readonly backEndClientBaseUri = environment.url;
  protected readonly loginState = this.renderService.getLogin();
  protected visible = this.loginState();

  protected closeLoginDialog(): void {
    this.renderService.switchLogin(false);
    this.visible = this.loginState();
  }

  protected goToRegister(): void {
    this.closeLoginDialog();
    this.router.navigate(["/registration"]);
  }

  protected readonly myIcon = myIcon;
}
