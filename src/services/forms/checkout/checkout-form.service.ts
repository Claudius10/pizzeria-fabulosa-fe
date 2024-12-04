import {Injectable, signal} from '@angular/core';
import {FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {
  step = signal(1);
  homeDelivery = signal(true);
  programmedDelivery = signal(false);
  changeRequested = signal(false);

  nextStep() {
    if (this.step() < 4) {
      this.step.update(current => current + 1);
    }
  }

  previousStep() {
    if (this.step() > 0) {
      this.step.update(current => current - 1);
    }
  }

  toggleProgrammedDeliveryTime(eventTarget: EventTarget | null) {
    if (eventTarget) {
      const value = (eventTarget as HTMLSelectElement).value;
      this.programmedDelivery.set(value !== "Lo antes posible");
    }
  }

  toggleRequestChangeOption(changeRequested: FormControl<string>, eventTarget: EventTarget | null) {
    if (eventTarget) {
      const value = (eventTarget as HTMLSelectElement).value;
      if (value === "Tarjeta") {
        changeRequested.disable();
      } else {
        changeRequested.enable();
      }
    }
  }

  toggleChangeRequestInput(eventTarget: EventTarget | null) {
    if (eventTarget) {
      const value = (eventTarget as HTMLSelectElement).value;
      this.changeRequested.set(value === "V");
    }
  }
}
