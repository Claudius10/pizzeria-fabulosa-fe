import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
    selector: 'app-forbidden',
    host: {
        class: 'upper-layout',
    },
    imports: [
        TranslatePipe
    ],
    templateUrl: './forbidden.component.html',
    styleUrl: './forbidden.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForbiddenComponent {

}
