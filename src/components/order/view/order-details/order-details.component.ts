import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsComponent {

}
