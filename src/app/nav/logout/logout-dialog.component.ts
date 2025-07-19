import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {AuthService} from '../../services/auth/auth.service';
import {DialogModule} from 'primeng/dialog';
import {Button} from 'primeng/button';
import {UpperCasePipe} from '@angular/common';
import {logout} from '../../../utils/functions';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-logout-dialog',
  imports: [
    DialogModule,
    TranslatePipe,
    UpperCasePipe,
    Button
  ],
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutDialogComponent {
  private backEndClientBaseUri = environment.url;
  private authService = inject(AuthService);
  protected visible: boolean = this.authService.logoutDialogVisibility();   // visible provides hiding dialog on esc key press

  protected acceptLogout() {
    logout(this.backEndClientBaseUri);
  }

  protected cancelLogout() {
    this.authService.logoutDialogVisibility.set(false);
    this.visible = this.authService.logoutDialogVisibility();
  }
}
