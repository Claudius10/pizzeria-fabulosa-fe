import {ChangeDetectionStrategy, Component} from '@angular/core';
import {UserDeleteFormComponent} from '../../forms/user/account-delete/user-delete-form.component';

@Component({
    selector: 'app-settings',
    imports: [
        UserDeleteFormComponent
    ],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
}
