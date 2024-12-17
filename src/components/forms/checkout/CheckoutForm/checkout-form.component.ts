import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CheckoutFormService} from '../../../../services/forms/checkout/checkout-form.service';
import {MenuItem} from 'primeng/api';
import {StepsModule} from 'primeng/steps';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {SmallScreenStepsComponent} from '../../../layout/steps/small-screen-steps.component';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {CheckoutCartComponent} from '../cart/checkout-cart.component';

@Component({
  selector: 'app-checkout-form',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [
    ReactiveFormsModule,
    StepsModule,
    CardModule,
    PanelModule,
    SmallScreenStepsComponent,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    CheckoutCartComponent
  ],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutFormComponent {
  protected checkoutFormService = inject(CheckoutFormService);
  steps: MenuItem[] = [
    {label: "Mis datos",},
    {label: "Dirección de entrega"},
    {label: "Plazo de entrega"},
    {label: "Método de pago"},
    {label: "Resumen"},
  ];
}
