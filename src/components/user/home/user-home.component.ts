import {ChangeDetectionStrategy, Component} from '@angular/core';
import {UserNavComponent} from '../nav/user-nav.component';
import {RouterOutlet} from '@angular/router';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-user-home',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [
    UserNavComponent,
    RouterOutlet,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserHomeComponent {

}
