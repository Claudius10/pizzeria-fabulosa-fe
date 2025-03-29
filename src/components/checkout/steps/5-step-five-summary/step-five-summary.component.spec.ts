import {ComponentFixture, TestBed} from '@angular/core/testing';
import {StepFiveSummaryComponent} from './step-five-summary.component';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../../../services/error/error.service';
import {ResourcesHttpService} from '../../../../services/http/resources/resources-http.service';
import {UserHttpService} from '../../../../services/http/user/user-http.service';
import {OrderHttpService} from '../../../../services/http/order/order-http.service';
import {QueryClient} from '@tanstack/angular-query-experimental';

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
        {provide: ResourcesHttpService, useValue: resourceServiceSpy},
        {provide: UserHttpService, useValue: userServiceSpy},
        {provide: OrderHttpService, useValue: orderServiceSpy},
        {provide: QueryClient},
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
