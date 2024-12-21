import {ChangeDetectionStrategy, Component, inject, OnDestroy, Signal} from '@angular/core';
import {ErrorService} from '../../../services/error/error.service';
import {ErrorDTO} from '../../../interfaces/http/api';
import {ErrorItemComponent} from './item/error-item.component';

@Component({
  selector: 'app-error',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [
    ErrorItemComponent
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent implements OnDestroy {
  errorService = inject(ErrorService);
  errors: Signal<ErrorDTO[]> = this.errorService.getErrors();

  ngOnDestroy(): void {
    this.errorService.clear();
  }
}
