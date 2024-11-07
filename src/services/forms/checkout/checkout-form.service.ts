import {inject, Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AnonOrderFormData, UserOrderFormData} from '../../../interfaces/dto/forms/order';
import {catchError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {
  private httpService = inject(HttpClient);
  private _homeDeliveryOptionVisibility = true;
  private _programmedDeliveryTimeVisibility = false;
  private _changeRequestInput = false;

  public createUserOrder(userOrder: UserOrderFormData, userId: string) {
    console.log(userOrder);
    return this.httpService.post<UserOrderFormData>(`http://192.168.1.128:8080/api/user/${userId}/order`, userOrder, {withCredentials: true})
      .pipe(catchError((err, caught) => {
        // have to return an Observable or throw the error
        const message: string = err.error.message;
        const status: number = err.status;
        const statusText: string = err.statusText;
        const isOk: boolean = err.ok;
        throw `Http request error: ${message}. Status: ${status} Status text: ${statusText}. IsOk: ${isOk}`;
      }));
  }

  public createNewAnonOrder(anonOrder: AnonOrderFormData) {
    console.log(anonOrder);
    return this.httpService.post<AnonOrderFormData>(`http://192.168.1.128:8080/api/anon/order`, anonOrder)
      .pipe(catchError((err, caught) => {
        // have to return an Observable or throw the error
        const message: string = err.error.message;
        const status: number = err.status;
        const statusText: string = err.statusText;
        const isOk: boolean = err.ok;
        throw `Http request error: ${message}. Status: ${status} Status text: ${statusText}. IsOk: ${isOk}`;
      }));
  }

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
