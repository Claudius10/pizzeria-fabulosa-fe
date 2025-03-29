import {ComponentFixture, TestBed} from '@angular/core/testing';
import {StepTwoWhereComponent} from './step-two-where.component';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../../../services/error/error.service';
import {ResourcesHttpService} from '../../../../services/http/resources/resources-http.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';
import {QueryClient} from '@tanstack/angular-query-experimental';

describe('Step-two-where', () => {
  let component: StepTwoWhereComponent;
  let fixture: ComponentFixture<StepTwoWhereComponent>;
  let resourcesHttpService: jasmine.SpyObj<ResourcesHttpService>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const ResourcesHttpServiceSpy = jasmine.createSpyObj('ResourcesHttpService', ['findStores', 'findStoresOnDemand']);

    await TestBed.configureTestingModule({
      imports: [StepTwoWhereComponent, TranslateModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: QueryClient},
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: resourcesHttpService, useValue: ResourcesHttpServiceSpy},
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
