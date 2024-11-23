import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CartComponent} from '../../cart/cart.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterOutlet,
    CartComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

}
