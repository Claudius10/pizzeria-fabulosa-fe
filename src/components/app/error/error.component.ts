import {ChangeDetectionStrategy, Component, inject, OnDestroy, Signal} from '@angular/core';
import {ErrorService} from '../../../services/error/error.service';
import {ErrorDTO} from '../../../interfaces/http/api';
import {ErrorItemComponent} from './item/error-item.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
    selector: 'app-error',
    host: {
        class: 'upper-layout',
    },
    imports: [
        ErrorItemComponent,
        TranslatePipe
    ],
    templateUrl: './error.component.html',
    styleUrl: './error.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent implements OnDestroy {
  errorService = inject(ErrorService);
  errors: Signal<ErrorDTO[]> = this.errorService.getErrors();

  ngOnDestroy(): void {
    this.errorService.clear();
  }
}
