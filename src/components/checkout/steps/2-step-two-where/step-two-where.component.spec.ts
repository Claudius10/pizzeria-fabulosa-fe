import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StepTwoWhereComponent} from './step-two-where.component';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../../../services/error/error.service';
import {ResourceService} from '../../../../services/http/resources/resource.service';
import {buildQueryOnDemand} from '../../../../utils/test-utils';

describe('Step-two-where', () => {
  let component: StepTwoWhereComponent;
  let fixture: ComponentFixture<StepTwoWhereComponent>;
  let resourceService: jasmine.SpyObj<ResourceService>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const resourceServiceSpy = jasmine.createSpyObj('ResourceService', ['findStores', 'findStoresOnDemand']);

    await TestBed.configureTestingModule({
      imports: [StepTwoWhereComponent, TranslateModule.forRoot()],
      providers: [
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: ResourceService, useValue: resourceServiceSpy},
      ]
    })
      .compileComponents();

    resourceService = TestBed.inject(ResourceService) as jasmine.SpyObj<ResourceService>;
    resourceService.findStoresOnDemand.and.returnValue(buildQueryOnDemand());

    fixture = TestBed.createComponent(StepTwoWhereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
