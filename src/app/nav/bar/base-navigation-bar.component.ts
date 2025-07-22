import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {LocaleSelectorComponent} from '../locale-selector/locale-selector.component';
import {ProgressBar} from 'primeng/progressbar';
import {LoadingAnimationService} from '../../services/animation/loading-animation.service';
import {ThemeSelectorComponent} from '../theme-selector/theme-selector.component';
import {MODE} from '../../../utils/constants';
import {TranslatePipe} from '@ngx-translate/core';
import {UserNavButtonsComponent} from './user-mode/buttons/user-nav-buttons.component';
import {AdminNavButtonsComponent} from './admin-mode/buttons/admin-nav-buttons.component';
import {RenderService} from '../../services/ui/render.service';

@Component({
  selector: 'app-base-navigation-bar',
  imports: [
    RouterLink,
    LocaleSelectorComponent,
    ThemeSelectorComponent,
    ProgressBar,
    NgOptimizedImage,
    RouterLinkActive,
    TranslatePipe,
    UserNavButtonsComponent,
    AdminNavButtonsComponent
  ],
  templateUrl: './base-navigation-bar.component.html',
  styleUrls: ['./base-navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseNavigationBarComponent {
  private readonly loadingAnimationService = inject(LoadingAnimationService);
  private readonly renderService = inject(RenderService);
  protected readonly isLoading: Signal<boolean> = this.loadingAnimationService.getIsLoading();
  protected readonly mode = this.renderService.getNavBarMode();
  protected readonly MODE = MODE;
  protected readonly userLinks = [
    {
      name: 'Pizzas',
      label: 'To Pizzas Page',
      path: 'pizzas'
    },
    {
      name: 'component.navigation.quick.link.beverages',
      label: 'To Beverages Page',
      path: 'beverages'
    }
  ];
}
