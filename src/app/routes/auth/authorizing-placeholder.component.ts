import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-authorizing-placeholder',
  host: {
    class: 'upper-layout',
  },
  imports: [],
  templateUrl: './authorizing-placeholder.component.html',
  styleUrl: './authorizing-placeholder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizingPlaceholderComponent {

}
