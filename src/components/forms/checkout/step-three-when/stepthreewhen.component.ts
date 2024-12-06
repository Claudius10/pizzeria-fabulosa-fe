import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {Button} from "primeng/button";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CheckoutFormService} from '../../../../services/forms/checkout/checkout-form.service';
import {getDeliveryHours} from '../../../../utils/functions';
import {timer} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout-step-three-when',
  standalone: true,
  imports: [
    Button,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './stepthreewhen.component.html',
  styleUrl: './stepthreewhen.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepThreeWhenComponent implements OnInit {
  protected checkoutFormService = inject(CheckoutFormService);
  private onDestroy = inject(DestroyRef);
  private router = inject(Router);
  programmedDelivery = this.checkoutFormService.programmedDelivery.asReadonly();
  deliveryHours = signal<string[]>(getDeliveryHours());

  ngOnInit(): void {
    this.checkoutFormService.step.set(2);
  }

  constructor() {
    const sub = timer(0, 300000).subscribe({
      next: () => {
        if (this.programmedDelivery()) {
          this.deliveryHours.set(getDeliveryHours());
        }
      }
    });

    this.onDestroy.onDestroy(() => {
      sub.unsubscribe();
    });
  }

  form = new FormGroup({
    deliveryTime: new FormControl("Lo antes posible", {
      validators: [Validators.required, Validators.minLength(4)],
      nonNullable: true,
      updateOn: "blur"
    }),
  });

  selectDeliveryChoice(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement.value === "Lo antes posible") {
      this.form.controls.deliveryTime.setValue("Lo antes posible");
      this.checkoutFormService.programmedDelivery.set(false);
    } else {
      this.form.controls.deliveryTime.setValue("");
      this.checkoutFormService.programmedDelivery.set(true);
    }
  }

  isStepValid() {
    const valid = this.form.valid;

    if (!valid) {
      Object.keys(this.form.controls).forEach(controlName => {
        const control = this.form.get(`${controlName}`);
        if (!control!.valid) {
          control!.markAsTouched();
        } else {
          control!.markAsUntouched();
        }
      });
    }

    return valid;
  }

  saveFormValues() {
    this.checkoutFormService.when.set({
      deliveryTime: this.form.get("deliveryTime")!.value
    });
  }

  previousStep() {
    this.router.navigate(['/new-order/step-two']);
  }

  nextStep() {
    if (this.isStepValid()) {
      this.saveFormValues();
      this.router.navigate(['/new-order/step-four']);
    }
  }
}
