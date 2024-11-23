import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ThemeSelectorComponent} from '../../theme-selector/theme-selector.component';
import {AuthService} from '../../../../services/auth/auth.service';
import {TranslatePipe} from '@ngx-translate/core';
import {LocaleSelectorComponent} from '../../locale-selector/locale-selector.component';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    RouterLink,
    ThemeSelectorComponent,
    LocaleSelectorComponent,
    TranslatePipe,
  ],
  templateUrl: './navigation-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent {
  private authService = inject(AuthService);
  isAuthenticated = this.authService.getIsAuthenticated();
}
