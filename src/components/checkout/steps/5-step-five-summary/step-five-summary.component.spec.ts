import {ComponentFixture, TestBed} from '@angular/core/testing';
import {StepFiveSummaryComponent} from './step-five-summary.component';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../../../services/error/error.service';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {AnonymousUserAPIService, ResourcesAPIService, UserAddressAPIService, UserOrdersAPIService} from '../../../../api';

describe('StepFiveSummaryComponent', () => {
  let component: StepFiveSummaryComponent;
  let fixture: ComponentFixture<StepFiveSummaryComponent>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserAddressAPIService,', ['findUserAddressList']);
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const resourceServiceSpy = jasmine.createSpyObj('ResourcesAPIService', ['findStores', 'findStoresOnDemand']);
    const userOrderServiceSpy = jasmine.createSpyObj('UserOrdersAPIService', ['createAnonOrder', 'createUserOrder']);
    const anonOrderServiceSpy = jasmine.createSpyObj('AnonymousUserAPIService', ['createAnonOrder', 'createUserOrder']);


    await TestBed.configureTestingModule({
      imports: [StepFiveSummaryComponent, TranslateModule.forRoot()],
      providers: [
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: ResourcesAPIService, useValue: resourceServiceSpy},
        {provide: UserAddressAPIService, useValue: userServiceSpy},
        {provide: UserOrdersAPIService, useValue: userOrderServiceSpy},
        {provide: AnonymousUserAPIService, useValue: anonOrderServiceSpy},
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
