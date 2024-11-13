import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavigationBarComponent} from '../navigation/navigation-bar/navigation-bar.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavigationBarComponent,
    RouterOutlet,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'PizzeriaAngularFE';
}
