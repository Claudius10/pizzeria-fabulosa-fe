import {ComponentFixture, TestBed} from '@angular/core/testing';
import {StepTwoWhereComponent} from './step-two-where.component';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../../services/error/error.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {StoreAPIService} from '../../../../api/public';

describe('Step-two-where', () => {
  let component: StepTwoWhereComponent;
  let fixture: ComponentFixture<StepTwoWhereComponent>;
  let storeAPI: jasmine.SpyObj<StoreAPIService>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const storeAPISpy = jasmine.createSpyObj('storesAPI', ['findStores']);

    await TestBed.configureTestingModule({
      imports: [StepTwoWhereComponent, TranslateModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: QueryClient},
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: storeAPI, useValue: storeAPISpy},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StepTwoWhereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
