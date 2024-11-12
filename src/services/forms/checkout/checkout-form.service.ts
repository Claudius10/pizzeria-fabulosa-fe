import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {
  private _homeDeliveryOptionVisibility = true;
  private _programmedDeliveryTimeVisibility = false;
  private _changeRequestInput = false;

  showHomeDeliveryOption() {
    this._homeDeliveryOptionVisibility = true;
  }

  hideHomeDeliveryOption() {
    this._homeDeliveryOptionVisibility = false;
  }

  get homeDeliveryOptionVisibility(): boolean {
    return this._homeDeliveryOptionVisibility;
  }

  get programmedDeliveryTimeVisibility(): boolean {
    return this._programmedDeliveryTimeVisibility;
  }

  get changeRequestInput(): boolean {
    return this._changeRequestInput;
  }

  toggleProgrammedDeliveryTime(eventTarget: EventTarget | null) {
    if (eventTarget) {
      const value = (eventTarget as HTMLSelectElement).value;
      this._programmedDeliveryTimeVisibility = value !== "Lo antes posible";
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
      this._changeRequestInput = value === "V";
    }
  }
}
