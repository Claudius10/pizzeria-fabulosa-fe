import {Injectable, signal} from '@angular/core';
import {how, summary, when, where, who} from '../../../interfaces/forms/steps';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {
  step = signal(4);
  selectedStore = signal<number | null>(null);
  homeDelivery = signal(true);
  programmedDelivery = signal(false);
  cashPayment = signal(false); // true shows Do you need change? select
  changeRequested = signal(false); // true shows Bill to change input
  who = signal<who | null>(null);
  where = signal<where | null>(null);
  when = signal<when | null>(null);
  how = signal<how | null>(null);
  summary = signal<summary | null>(null);

  isFormFilled() {
    return this.who() !== null && this.where() !== null && this.when() !== null && this.how() !== null;
  }

  cancel() {
    this.who.set(null);
    this.where.set(null);
    this.when.set(null);
    this.how.set(null);
    this.summary.set(null);
    this.selectedStore.set(null);
  }
}
