import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BeverageListComponent} from './beverage-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../../services/error/error.service';
import {buildResponse} from '../../../utils/test-utils';
import {ResourcesHttpService} from '../../../services/http/resources/resources-http.service';
import {of} from 'rxjs';
import {provideRouter} from '@angular/router';
import {QueryClient} from '@tanstack/angular-query-experimental';

describe('BeverageListComponent', () => {
  let component: BeverageListComponent;
  let fixture: ComponentFixture<BeverageListComponent>;
  let resourceService: jasmine.SpyObj<ResourcesHttpService>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const resourceServiceSpy = jasmine.createSpyObj('ResourceService', ['findProducts']);

    await TestBed.configureTestingModule({
      imports: [BeverageListComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        provideRouter([{path: '**', component: BeverageListComponent}]),
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: ResourcesHttpService, useValue: resourceServiceSpy},
      ],
    })
      .compileComponents();

    resourceService = TestBed.inject(ResourcesHttpService) as jasmine.SpyObj<ResourcesHttpService>;
    resourceService.findProducts.and.returnValue(of(buildResponse(null, false, 200, 'OK')));

    fixture = TestBed.createComponent(BeverageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
