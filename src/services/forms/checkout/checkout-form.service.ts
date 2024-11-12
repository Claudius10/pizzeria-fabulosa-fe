import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {
  homeDeliveryOptionVisibility = true;
  programmedDeliveryTimeVisibility = false;
  changeRequestInput = false;

  public setShowHomeDeliveryOption(value: boolean) {
    this.homeDeliveryOptionVisibility = value;
  }

  toggleProgrammedDeliveryTime(eventTarget: EventTarget | null) {
    if (eventTarget) {
      const value = (eventTarget as HTMLSelectElement).value;
      this.programmedDeliveryTimeVisibility = value !== "Lo antes posible";
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
      this.changeRequestInput = value === "V";
    }
  }
}
