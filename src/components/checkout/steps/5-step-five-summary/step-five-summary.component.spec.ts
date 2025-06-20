import {ComponentFixture, TestBed} from '@angular/core/testing';
import {StepFiveSummaryComponent} from './step-five-summary.component';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../../../services/error/error.service';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {AnonymousOrdersAPIService, StoreAPIService} from '../../../../api/asset';
import {UserOrdersAPIService} from '../../../../api/business';

describe('StepFiveSummaryComponent', () => {
  let component: StepFiveSummaryComponent;
  let fixture: ComponentFixture<StepFiveSummaryComponent>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const storeServiceSpy = jasmine.createSpyObj('storesAPI', ['findAll']);
    const userOrderServiceSpy = jasmine.createSpyObj('userOrdersAPI', ['create']);
    const anonOrderServiceSpy = jasmine.createSpyObj('anonymousOrdersAPI', ['createAnonOrder']);

    await TestBed.configureTestingModule({
      imports: [StepFiveSummaryComponent, TranslateModule.forRoot()],
      providers: [
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: StoreAPIService, useValue: storeServiceSpy},
        {provide: UserOrdersAPIService, useValue: userOrderServiceSpy},
        {provide: AnonymousOrdersAPIService, useValue: anonOrderServiceSpy},
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
