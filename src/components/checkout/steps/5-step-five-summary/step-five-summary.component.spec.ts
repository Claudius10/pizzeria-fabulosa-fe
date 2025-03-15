import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StepFiveSummaryComponent} from './step-five-summary.component';
import {TranslateModule} from '@ngx-translate/core';
import {UserService} from '../../../../services/http/user/user.service';
import {OrderService} from '../../../../services/http/order/order.service';
import {ErrorService} from '../../../../services/error/error.service';
import {ResourceService} from '../../../../services/http/resources/resource.service';

describe('StepFiveSummaryComponent', () => {
  let component: StepFiveSummaryComponent;
  let fixture: ComponentFixture<StepFiveSummaryComponent>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['findUserAddressList']);
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const resourceServiceSpy = jasmine.createSpyObj('ResourceService', ['findStores', 'findStoresOnDemand']);
    const orderServiceSpy = jasmine.createSpyObj('OrderService', ['createAnonOrder', 'createUserOrder']);

    await TestBed.configureTestingModule({
      imports: [StepFiveSummaryComponent, TranslateModule.forRoot()],
      providers: [
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: ResourceService, useValue: resourceServiceSpy},
        {provide: UserService, useValue: userServiceSpy},
        {provide: OrderService, useValue: orderServiceSpy},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StepFiveSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
