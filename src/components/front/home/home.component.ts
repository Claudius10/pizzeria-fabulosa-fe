import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-home',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
