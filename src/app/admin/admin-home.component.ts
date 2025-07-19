import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';
import {AdminNavComponent} from './nav/admin-nav.component';

@Component({
  selector: 'app-admin-home',
  host: {
    class: 'upper-layout',
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

  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.isAdminMode.set(true);
  }

  ngOnDestroy(): void {
    this.authService.isAdminMode.set(false);
  }
}
