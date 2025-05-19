import {Injectable} from '@angular/core';
import {how, when, where} from '../../utils/interfaces/steps';
import {CreatedOrderDTO, CustomerDTO} from '../../api';

export type AddressId = {
  id: number | null;
  isStore: boolean | null;
}

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {
  step = 0;

  cashPayment = false; // true shows Do you need change? select
  changeRequested = false; // true shows Bill to change input

  selectedAddress: AddressId = {id: null, isStore: null};
  homeDelivery = true;
  programmedDelivery = false;

  who: CustomerDTO | null = null;
  where: where | null = null;
  when: when | null = null;
  how: how | null = null;
  comment: string | null = null;

  orderSuccess: CreatedOrderDTO | null = null;

  isStepFilled(step: number) {
    switch (step) {
      case 1:
        return this.who !== null;
      case 2:
        return this.who !== null && (this.where !== null || this.selectedAddress.id !== null);
      case 3:
        return this.who !== null && (this.where !== null || this.selectedAddress.id !== null) && this.when !== null;
      case 4:
        return this.who !== null && (this.where !== null || this.selectedAddress.id !== null) && this.when !== null && this.how !== null;
      default:
        return false;
    }
  }

  clear() {
    this.step = 0;

    this.cashPayment = false;
    this.changeRequested = false;

    this.selectedAddress = {id: null, isStore: null};
    this.homeDelivery = true;
    this.programmedDelivery = false;

    this.who = null;
    this.where = null;
    this.when = null;
    this.how = null;
    this.comment = null;

    this.orderSuccess = null;
  }

  getDeliveryHours(now: string): string[] {
    const hourIntervals: string[] = [];
    const date = new Date(now);
    const currentHour = date.getHours() * 60;
    const interval = 5;

    const coefficient = 1000 * 60 * 5;
    const roundedCurrentMins = new Date(Math.ceil(date.getTime() / coefficient) * coefficient).getMinutes();

    for (let minutes = currentHour + roundedCurrentMins + 30; minutes < 24 * 60; minutes = minutes + interval) {
      date.setHours(0);
      date.setMinutes(minutes);
      hourIntervals.push(date.toLocaleTimeString("es", {timeStyle: "short"}));
    }

    return hourIntervals;
  }
}
