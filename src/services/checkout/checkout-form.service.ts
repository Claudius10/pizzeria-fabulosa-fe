import {Injectable, signal} from '@angular/core';
import {how, when, where} from '../../interfaces/forms/steps';
import {CreatedOrderDTO, CustomerDTO} from '../../interfaces/dto/order';

export type AddressId = {
  id: number | null;
  isStore: boolean | null;
}

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {
  step = signal(0);
  selectedId = signal<AddressId>({id: null, isStore: null});
  homeDelivery = signal(true);
  programmedDelivery = signal(false);
  cashPayment = signal(false); // true shows Do you need change? select
  changeRequested = signal(false); // true shows Bill to change input
  who = signal<CustomerDTO | null>(null);
  where = signal<where | null>(null);
  when = signal<when | null>(null);
  how = signal<how | null>(null);
  orderSuccess = signal<CreatedOrderDTO | null>(null);

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

    this.selectedId.set({id: null, isStore: null});
    this.homeDelivery.set(true);
    this.programmedDelivery.set(false);
    this.cashPayment.set(false);
    this.changeRequested.set(false);
    this.orderSuccess.set(null);

    this.who.set(null);
    this.where.set(null);
    this.when.set(null);
    this.how.set(null);
  }

  getDeliveryHours(): string[] {
    const interval = 5;
    const hourIntervals: string[] = [];
    const date = new Date();

    const coefficient = 1000 * 60 * 5;
    const roundedCurrentMins = new Date(
      Math.ceil(date.getTime() / coefficient) * coefficient
    ).getMinutes();
    const currentHour = new Date().getHours() * 60;

    for (
      let minutes = currentHour + roundedCurrentMins + 30;
      minutes < 24 * 60;
      minutes = minutes + interval
    ) {
      date.setHours(0);
      date.setMinutes(minutes);
      hourIntervals.push(date.toLocaleTimeString("es", {timeStyle: "short"}));
    }
    return hourIntervals;
  }
}

function getTestOrderSuccess(): CreatedOrderDTO {
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
      paymentMethod: "Tarjeta",
      deliveryTime: "As soon as posible",
      billToChange: null,
      comment: "this is a comment please ensure the pizza is hot and good and well cut and you know to give me superpowers",
      changeToGive: null
    },
    cart: {
      cartItems: [
        {
          productType: "pizza",
          allergens: {
            en: [],
            es: []
          },
          prices: {
            s: 0,
            m: 13.30,
            l: 18.30
          },
          name: {
            en: "Cuatro Quesos",
            es: "Cuatro Quesos"
          },
          formats: {
            s: {
              en: "",
              es: ""
            },
            m: {
              en: "Medium",
              es: "Mediana"
            },
            l: {
              en: "Large",
              es: "Familiar"
            }
          },
          id: "1",
          image: "",
          price: 13.30,
          description: {
            en: [],
            es: []
          },
          quantity: 1,
          format: "Mediana",
          code: "P1C"
        }
      ],
      id: 1,
      totalCost: 0,
      totalCostOffers: 0,
      totalQuantity: 0
    },
  };
}
