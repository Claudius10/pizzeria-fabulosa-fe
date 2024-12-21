import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {CardModule} from 'primeng/card';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [
    CardModule,
    TranslatePipe
  ],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerErrorComponent {
  reason = input<string>();
}
