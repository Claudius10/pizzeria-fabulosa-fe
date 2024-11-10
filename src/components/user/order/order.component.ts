import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';
import {getEmptyOrder, UserService} from '../../../services/user/user.service';
import {AuthService} from '../../../services/auth/auth.service';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {OrderDTO} from '../../../interfaces/dto/order';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  order = signal<OrderDTO>(getEmptyOrder());

  constructor(private activatedRoute: ActivatedRoute, private destroyRef: DestroyRef) {
    const subscription = this.userService.getUserOrder(this.authService.getUserId(), this.activatedRoute.snapshot.paramMap.get("orderId"))
      .subscribe({
        next: order => {
          this.order.set(order);
        }
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
