import {afterNextRender, ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavigationBarComponent} from '../../nav/navigation-bar/navigation-bar.component';
import {FooterComponent} from '../../footer/footer.component';
import {ToastModule} from "primeng/toast";
import {ErrorService} from '../../../services/error/error.service';
import {ThemeService} from '../../../services/theme/theme.service';


@Component({
  selector: 'app-root',
  imports: [
    NavigationBarComponent,
    RouterOutlet,
    FooterComponent,
    ToastModule
  ],
  providers: [ErrorService],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private themeService = inject(ThemeService);

  constructor() {
    afterNextRender(() => {
      this.themeService.reload();
    });
  }
}
