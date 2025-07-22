import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {DialogModule} from 'primeng/dialog';
import {Button} from 'primeng/button';
import {UpperCasePipe} from '@angular/common';
import {logout} from '../../../utils/functions';
import {environment} from '../../../environments/environment';
import {RenderService} from '../../services/ui/render.service';

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
  private readonly backEndClientBaseUri = environment.url;
  private readonly renderService = inject(RenderService);
  protected readonly logoutState = this.renderService.getLogout();
  protected visible = this.logoutState();

  protected acceptLogout() {
    logout(this.backEndClientBaseUri);
  }

  protected cancelLogout() {
    this.renderService.switchLogout(false);
    this.visible = this.logoutState();
  }
}
