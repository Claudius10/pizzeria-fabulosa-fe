import {ComponentFixture, TestBed} from '@angular/core/testing';


import {TranslateModule} from '@ngx-translate/core';
import {StepThreeWhenComponent} from './step-three-when.component';
import {ErrorService} from '../../../../services/error/error.service';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {ResourcesAPIService} from '../../../../api';

describe('Step-three-when', () => {
  let component: StepThreeWhenComponent;
  let fixture: ComponentFixture<StepThreeWhenComponent>;
  const resourceServiceSpy = jasmine.createSpyObj('ResourcesAPIService', ['findStores', 'findOffers']);
  const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [StepThreeWhenComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        {provide: ResourcesAPIService, useValue: resourceServiceSpy},
        {provide: ErrorService, useValue: errorServiceSpy},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StepThreeWhenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
