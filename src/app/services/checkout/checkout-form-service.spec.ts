import {TestBed} from '@angular/core/testing';
import {CheckoutFormService} from './checkout-form.service';

describe('CheckoutFormServiceServiceTests', () => {
  let service: CheckoutFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('givenStepOneToCheck_whenWhoIsValid_thenReturnTrue', () => {

    // Arrange

    service.setWho({
      anonCustomerName: "",
      anonCustomerEmail: "",
      anonCustomerContactNumber: 0
    });

    // Act

    const result = service.isStepFilled(1);

    // Assert

    expect(result).toBeTrue();
  });

  it('givenStepOneToCheck_whenWhoIsNull_thenReturnFalse', () => {

    // Act

    const result = service.isStepFilled(1);

    // Assert

    expect(result).toBeFalse();
  });

  it('givenStepTwoToCheck_whenWhereIsInvalid_thenReturnFalse', () => {

    // Arrange

    service.setWho({
      anonCustomerName: "",
      anonCustomerEmail: "",
      anonCustomerContactNumber: 0
    });

    // Act

    const result = service.isStepFilled(2);

    // Assert

    expect(result).toBeFalse();
  });

  it('givenStepTwoToCheck_whenWhoAndWhereIsValid_thenReturnTrue', () => {

    // Arrange

    service.setWho({
      anonCustomerName: "",
      anonCustomerEmail: "",
      anonCustomerContactNumber: 0
    });

    service.setWhere({
      details: "",
      number: 1,
      street: ""
    });

    // Act

    const result = service.isStepFilled(2);

    // Assert

    expect(result).toBeTrue();
  });

  it('givenStepThreeToCheck_whenWhoAndWhereAndWhenIsValid_thenReturnTrue', () => {

    // Arrange

    service.setWho({
      anonCustomerName: "",
      anonCustomerEmail: "",
      anonCustomerContactNumber: 0
    });

    service.setWhere({
      details: "",
      number: 1,
      street: ""
    });

    service.setWhen({
      deliveryTime: "asap"
    });

    // Act

    const result = service.isStepFilled(3);

    // Assert

    expect(result).toBeTrue();
  });

  it('givenStepThreeToCheck_whenWhenIsInvalid_thenReturnFalse', () => {

    // Arrange

    service.setWho({
      anonCustomerName: "",
      anonCustomerEmail: "",
      anonCustomerContactNumber: 0
    });

    service.setWhere({
      details: "",
      number: 1,
      street: ""
    });

    // Act

    const result = service.isStepFilled(3);

    // Assert

    expect(result).toBeFalse();
  });

  it('givenStepFourToCheck_whenWhoAndWhereAndWhenAndHowIsValid_thenReturnTrue', () => {

    // Arrange

    service.setWho({
      anonCustomerName: "",
      anonCustomerEmail: "",
      anonCustomerContactNumber: 0
    });

    service.setWhere({
      details: "",
      number: 1,
      street: ""
    });

    service.setWhen({
      deliveryTime: "asap"
    });

    service.setHow({
      paymentMethod: "Card",
      billToChange: 0
    });

    // Act

    const result = service.isStepFilled(4);

    // Assert

    expect(result).toBeTrue();
  });

  it('givenStepFourToCheck_whenHowIsInvalid_thenReturnFalse', () => {

    // Arrange

    service.setWho({
      anonCustomerName: "",
      anonCustomerEmail: "",
      anonCustomerContactNumber: 0
    });

    service.setWhere({
      details: "",
      number: 1,
      street: ""
    });

    service.setWhen({
      deliveryTime: "asap"
    });

    // Act

    const result = service.isStepFilled(4);

    // Assert

    expect(result).toBeFalse();
  });
});
