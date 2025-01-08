import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
    selector: 'app-not-found',
    host: {
        class: 'upper-layout',
    },
    imports: [
        TranslatePipe
    ],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {

}
