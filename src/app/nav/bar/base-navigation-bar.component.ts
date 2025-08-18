import {ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, signal, Signal, ViewChild} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {ProgressBar} from 'primeng/progressbar';
import {LoadingAnimationService} from '../../services/animation/loading-animation.service';
import {MODE} from '../../../utils/constants';
import {TranslatePipe} from '@ngx-translate/core';
import {UserNavButtonsComponent} from './user-mode/buttons/user-nav-buttons.component';
import {AdminNavButtonsComponent} from './admin-mode/buttons/admin-nav-buttons.component';
import {RenderService} from '../../services/ui/render.service';
import {LocaleSelectorComponent} from '../locale-selector/locale-selector.component';
import {ThemeSelectorComponent} from '../theme-selector/theme-selector.component';

@Component({
  selector: 'app-base-navigation-bar',
  imports: [
    RouterLink,
    ProgressBar,
    NgOptimizedImage,
    RouterLinkActive,
    TranslatePipe,
    UserNavButtonsComponent,
    AdminNavButtonsComponent,
    LocaleSelectorComponent,
    ThemeSelectorComponent
  ],
  templateUrl: './base-navigation-bar.component.html',
  styleUrls: ['./base-navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseNavigationBarComponent {
  private readonly loadingAnimationService = inject(LoadingAnimationService);
  private readonly renderService = inject(RenderService);
  protected readonly visible = signal(false);
  protected readonly isLoading: Signal<boolean> = this.loadingAnimationService.getIsLoading();
  protected readonly mode = this.renderService.getNavBarMode();
  protected readonly MODE = MODE;
  protected readonly userLinks = [
    {
      name: 'Pizzas',
      path: 'pizzas'
    },
    {
      name: 'component.navigation.quick.link.beverages',
      path: 'beverages'
    }
  ];

  @ViewChild('options') options: ElementRef | undefined;

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (this.options) {
      if (!this.options.nativeElement.contains(event.target)) {
        this.visible.set(false);
      }
    }
  }

  protected showRoutesDrawer() {
    this.renderService.switchRoutesDrawer(true);
  }

  protected toggle() {
    this.visible.set(!this.visible());
  }
}
