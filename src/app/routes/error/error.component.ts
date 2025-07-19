import {ChangeDetectionStrategy, Component, inject, OnDestroy, Signal} from '@angular/core';
import {ErrorService} from '../../services/error/error.service';
import {ErrorItemComponent} from './item/error-item.component';
import {TranslatePipe} from '@ngx-translate/core';
import {APIError} from '../../../api/user';

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
  protected errorService = inject(ErrorService);
  errors: Signal<APIError[]> = this.errorService.getErrors();

  ngOnDestroy(): void {
    this.errorService.clear();
  }
}
