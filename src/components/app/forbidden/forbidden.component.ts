import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-forbidden',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [
    TranslatePipe
  ],
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForbiddenComponent {

}
