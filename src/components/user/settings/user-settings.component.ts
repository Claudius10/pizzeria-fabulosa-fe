import {ChangeDetectionStrategy, Component} from '@angular/core';
import {UserDeleteFormComponent} from './account-delete/user-delete-form.component';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-settings',
  imports: [
    UserDeleteFormComponent,
    Card
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSettingsComponent {
}
