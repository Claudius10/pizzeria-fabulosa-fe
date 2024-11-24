import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-not-found',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {

}
