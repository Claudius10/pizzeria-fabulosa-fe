import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AccountService} from '../../../services/account/account.service';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  private accountService = inject(AccountService);
  private authService = inject(AuthService);
  private logoutUser = this.accountService.logout();
  private router = inject(Router);

  public logout() {
    this.logoutUser.mutate(undefined, {
      onSuccess: () => {
        // notification
        this.authService.logout();
        this.router.navigate(["/"]).catch(reason => {
          // ???
        });
      },
      onError: () => {
      }
    });
  }
}
