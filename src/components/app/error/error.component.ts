import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {ErrorService} from '../../../services/error/error.service';
import {ErrorDTO} from '../../../interfaces/http/api';
import {CardModule} from 'primeng/card';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-error',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [
    CardModule,
    Button
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent {
  private errorService = inject(ErrorService);
  error: Signal<ErrorDTO | null> = this.errorService.getError();
}
