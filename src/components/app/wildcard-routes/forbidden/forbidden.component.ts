import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-forbidden',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [],
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForbiddenComponent {

}
