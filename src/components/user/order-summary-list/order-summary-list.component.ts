import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {UserService} from '../../../services/user/user.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {OrderSummaryComponent} from '../order-summary/order-summary.component';

@Component({
  selector: 'app-order-summary-list',
  standalone: true,
  imports: [
    OrderSummaryComponent
  ],
  templateUrl: './order-summary-list.component.html',
  styleUrl: './order-summary-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryListComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);

  userOrderSummaryList = toSignal(this.userService.getOrderSummaryList(this.authService.getUserId(), 0, 5), {
    initialValue: {
      orderList: [],
      totalPages: 0,
      pageSize: 0
    }
  });
}
