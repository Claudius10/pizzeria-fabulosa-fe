import {ChangeDetectionStrategy, Component, inject, ViewChild} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ThemeSelectorComponent} from '../../theme-selector/theme-selector.component';
import {AuthService} from '../../../../services/auth/auth.service';
import {TranslatePipe} from '@ngx-translate/core';
import {LocaleSelectorComponent} from '../../locale-selector/locale-selector.component';
import {ConfirmationService} from 'primeng/api';
import {ConfirmPopup, ConfirmPopupModule} from 'primeng/confirmpopup';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    RouterLink,
    ThemeSelectorComponent,
    LocaleSelectorComponent,
    TranslatePipe,
    ConfirmPopupModule,
    Button,
  ],
  providers: [ConfirmationService],
  templateUrl: './navigation-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent {
  private authService = inject(AuthService);
  private confirmationService = inject(ConfirmationService);
  isAuthenticated = this.authService.getIsAuthenticated();

  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  accept() {
    this.confirmPopup.accept();
  }

  reject() {
    this.confirmPopup.reject();
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      accept: () => {

      },
      reject: () => {

      }
    });
  }
}
