import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TranslateModule} from '@ngx-translate/core';
import {StepThreeWhenComponent} from './step-three-when.component';
import {ErrorService} from '../../../services/error/error.service';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {of} from 'rxjs';
import {StoreAPIService, UtilAPIService} from '../../../../api/public';

describe('Step-three-when', () => {
  let component: StepThreeWhenComponent;
  let fixture: ComponentFixture<StepThreeWhenComponent>;
  const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
  const storeAPISpy = jasmine.createSpyObj('storesAPI', ['findAll']);
  let utilAPI: jasmine.SpyObj<UtilAPIService>;

  beforeEach(async () => {
    const utilAPISpy = jasmine.createSpyObj('UtilAPIService', ['getNowAccountingDST']);

    await TestBed.configureTestingModule({
      imports: [StepThreeWhenComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        {provide: StoreAPIService, useValue: storeAPISpy},
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: UtilAPIService, useValue: utilAPISpy},
      ]
    })
      .compileComponents();

    utilAPI = TestBed.inject(UtilAPIService) as jasmine.SpyObj<UtilAPIService>;
    utilAPI.getNowAccountingDST.and.returnValue(of());

    fixture = TestBed.createComponent(StepThreeWhenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
