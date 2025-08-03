import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AdminNavComponent} from './nav/admin-nav.component';
import {RenderService} from '../../services/ui/render.service';
import {ADMIN_MODE, MODE} from '../../../utils/constants';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-admin-home',
  host: {
    class: 'admin-upper-layout',
  },
  imports: [
    RouterOutlet,
    AdminNavComponent
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminHomeComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isServer = !isPlatformBrowser(this.platformId);
  private readonly renderService = inject(RenderService);
  private readonly localStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    this.renderService.switchNavBarMode(MODE.ADMIN);
  }

  ngOnDestroy(): void {
    if (!this.isServer) {
      this.localStorageService.remove(ADMIN_MODE);
    }
    this.renderService.switchNavBarMode(MODE.USER);
  }
}
