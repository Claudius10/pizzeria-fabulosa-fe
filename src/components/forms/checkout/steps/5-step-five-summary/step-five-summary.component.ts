import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CheckoutFormService} from '../../../../../services/forms/checkout/checkout-form.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-step-five-summary',
  standalone: true,
  imports: [],
  templateUrl: './step-five-summary.component.html',
  styleUrl: './step-five-summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepFiveSummaryComponent {
  protected checkoutFormService = inject(CheckoutFormService);
  private router = inject(Router);

}
