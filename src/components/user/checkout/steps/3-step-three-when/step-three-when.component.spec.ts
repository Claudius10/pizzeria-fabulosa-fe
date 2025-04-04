import {ComponentFixture, TestBed} from '@angular/core/testing';


import {TranslateModule} from '@ngx-translate/core';
import {StepThreeWhenComponent} from './step-three-when.component';
import {ResourcesHttpService} from '../../../../services/http/resources/resources-http.service';
import {ErrorService} from '../../../../services/error/error.service';
import {QueryClient} from '@tanstack/angular-query-experimental';

describe('Step-three-when', () => {
  let component: StepThreeWhenComponent;
  let fixture: ComponentFixture<StepThreeWhenComponent>;
  const resourceServiceSpy = jasmine.createSpyObj('ResourceService', ['findStores', 'findOffers']);
  const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [StepThreeWhenComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        {provide: ResourcesHttpService, useValue: resourceServiceSpy},
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
