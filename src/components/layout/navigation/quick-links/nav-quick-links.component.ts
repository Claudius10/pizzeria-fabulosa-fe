import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-quick-links',
  standalone: true,
  imports: [],
  templateUrl: './nav-quick-links.component.html',
  styleUrl: './nav-quick-links.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavQuickLinksComponent {
  private router = inject(Router);

}
