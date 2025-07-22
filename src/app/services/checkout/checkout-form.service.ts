import {Injectable, signal} from '@angular/core';
import {how, when, where} from '../../../utils/interfaces/steps';
import {CreatedOrderDTO, CustomerDTO} from '../../../api/business';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {
  private readonly step = signal(0); // MUST START AT 0 FOR THE STEPS COMPONENTS FROM PRIMENG
  private readonly cashPayment = signal(false); // true shows Do you need change? select
  private readonly changeRequested = signal(false); // true shows Bill to change input
  private readonly selectedStore = signal<string | null>(null);
  private readonly homeDelivery = signal(true);
  private readonly programmedDelivery = signal(false);
  private readonly who = signal<CustomerDTO | null>(null);
  private readonly where = signal<where | null>(null);
  private readonly when = signal<when | null>(null);
  private readonly how = signal<how | null>(null);
  private readonly comment = signal<string | null>(null);
  private readonly orderSuccess = signal<CreatedOrderDTO | null>(null);

  isStepFilled(step: number) {
    switch (step) { // the first step is not checked
      case 1:
        return this.who() !== null;
      case 2:
        return this.who() !== null && (this.where() !== null || this.selectedStore() !== null);
      case 3:
        return this.who() !== null && (this.where() !== null || this.selectedStore() !== null) && this.when() !== null;
      case 4:
        return this.who() !== null && (this.where() !== null || this.selectedStore() !== null) && this.when() !== null && this.how() !== null;
      default:
        return false;
    }
  }

  clear() {
    this.step.set(0);
    this.cashPayment.set(false);
    this.changeRequested.set(false);
    this.selectedStore.set(null);
    this.homeDelivery.set(true);
    this.programmedDelivery.set(false);
    this.who.set(null);
    this.where.set(null);
    this.when.set(null);
    this.how.set(null);
    this.comment.set(null);
    this.orderSuccess.set(null);
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

  getStep() {
    return this.step.asReadonly();
  }

  getCashPayment() {
    return this.cashPayment.asReadonly();
  }

  getChangeRequested() {
    return this.changeRequested.asReadonly();
  }

  getSelectedStore() {
    return this.selectedStore.asReadonly();
  }

  getHomeDelivery() {
    return this.homeDelivery.asReadonly();
  }

  getProgrammedDelivery() {
    return this.programmedDelivery.asReadonly();
  }

  getWho() {
    return this.who.asReadonly();
  }

  getWhere() {
    return this.where.asReadonly();
  }

  getWhen() {
    return this.when.asReadonly();
  }

  getHow() {
    return this.how.asReadonly();
  }

  getComment() {
    return this.comment.asReadonly();
  }

  getOrderSuccess() {
    return this.orderSuccess.asReadonly();
  }

  setStep(step: number) {
    this.step.set(step);
  }

  setWho(who: CustomerDTO | null) {
    this.who.set(who);
  }

  setWhen(when: when | null) {
    this.when.set(when);
  }

  setWhere(where: where | null) {
    this.where.set(where);
  }

  setHow(how: how | null) {
    this.how.set(how);
  }

  setHomeDelivery(homeDelivery: boolean) {
    this.homeDelivery.set(homeDelivery);
  }

  setSelectedStore(selectedStore: string | null) {
    this.selectedStore.set(selectedStore);
  }

  setProgrammedDelivery(programmedDelivery: boolean) {
    this.programmedDelivery.set(programmedDelivery);
  }

  setCashPayment(cashPayment: boolean) {
    this.cashPayment.set(cashPayment);
  }

  setChangeRequested(changeRequested: boolean) {
    this.changeRequested.set(changeRequested);
  }

  setComment(comment: string | null) {
    this.comment.set(comment);
  }

  setOrderSuccess(orderSuccess: CreatedOrderDTO | null) {
    this.orderSuccess.set(orderSuccess);
  }
}
