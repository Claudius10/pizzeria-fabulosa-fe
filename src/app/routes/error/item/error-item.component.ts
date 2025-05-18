import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Button} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {APIError} from '../../../../api';

@Component({
  selector: 'app-error-item',
  imports: [
    Button,
    CardModule
  ],
  templateUrl: './error-item.component.html',
  styleUrl: './error-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorItemComponent {
  error = input.required<APIError>();
}
