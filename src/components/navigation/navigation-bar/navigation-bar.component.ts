import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ThemeSelectorComponent} from '../../theme-selector/theme-selector.component';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    RouterLink,
    ThemeSelectorComponent,
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent {
  private authService = inject(AuthService);
  isAuthenticated = this.authService.getIsAuthenticated();
}
