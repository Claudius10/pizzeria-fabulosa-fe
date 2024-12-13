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
  anonOrderSuccess = signal<AnonOrderDTO | null>(getTestOrderSuccess());

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

function getTestOrderSuccess(): AnonOrderDTO {
  return {
    id: 1,
    formattedCreatedOn: "12/12/2024",
    customer: {
      name: "Clau",
      email: "email@gmail.com",
      contactNumber: 123123123
    },
    address: {
      id: 1,
      street: "Calle Alustre",
      number: 15,
      details: null
    },
    orderDetails: {
      id: 1,
      paymentMethod: "Card",
      deliveryTime: "ASAP",
      billToChange: null,
      comment: "this is a comment please ensure the pizza is hot and good and well cut and you know to give me superpowers",
      changeToGive: null
    },
    cart: {
      cartItems: [
        {
          id: 1,
          format: "Mediana",
          image: "",
          name: "Cuatro Quesos",
          price: 13.30,
          productType: "Pizza",
          quantity: 1
        }
      ],
      id: 1,
      totalCost: 0,
      totalCostOffers: 0,
      totalQuantity: 0
    },
  };
}
