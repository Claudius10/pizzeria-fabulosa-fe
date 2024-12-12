import {Injectable, signal} from '@angular/core';
import {how, when, where, who} from '../../../interfaces/forms/steps';
import {AnonOrderDTO} from '../../../interfaces/dto/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {
  step = signal(0);
  selectedStore = signal<number | null>(null);
  homeDelivery = signal(true);
  programmedDelivery = signal(false);
  cashPayment = signal(false); // true shows Do you need change? select
  changeRequested = signal(false); // true shows Bill to change input
  who = signal<who | null>(null);
  where = signal<where | null>(null);
  when = signal<when | null>(null);
  how = signal<how | null>(null);
  anonOrderSuccess = signal<AnonOrderDTO | null>(null);

  isStepFilled(step: number) {
    switch (step) {
      case 1:
        return this.who() !== null;
      case 2:
        return this.who() !== null && this.where() !== null;
      case 3:
        return this.who() !== null && this.where() !== null && this.when() !== null;
      case 4:
        return this.who() !== null && this.where() !== null && this.when() !== null && this.how() !== null;
      default:
        return false;
    }
  }

  clear() {
    this.step.set(0);

    this.selectedStore.set(null);
    this.homeDelivery.set(true);
    this.programmedDelivery.set(false);
    this.cashPayment.set(false);
    this.changeRequested.set(false);

    this.who.set(null);
    this.where.set(null);
    this.when.set(null);
    this.how.set(null);
  }
}
