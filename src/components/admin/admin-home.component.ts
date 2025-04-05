import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/common/auth/auth.service';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-admin-home',
  host: {
    class: 'upper-layout',
  },
  imports: [
    Card
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminHomeComponent {
  protected authService = inject(AuthService);
  private router = inject(Router);

  adminLogout() {

    // send post to get token without admin role
    // if successful
    this.authService.isAuthedAsAdmin = false;
    this.router.navigate(['']);
  }

}
