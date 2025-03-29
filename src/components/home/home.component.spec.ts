import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../services/error/error.service';
import {buildResponse} from '../../utils/test-utils';
import {ResourcesHttpService} from '../../services/http/resources/resources-http.service';
import {of} from 'rxjs';
import {QueryClient} from '@tanstack/angular-query-experimental';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let resourceService: jasmine.SpyObj<ResourcesHttpService>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const resourceServiceSpy = jasmine.createSpyObj('ResourceService', ['findStores', 'findOffers']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: ResourcesHttpService, useValue: resourceServiceSpy},
      ],
    })
      .compileComponents();

    resourceService = TestBed.inject(ResourcesHttpService) as jasmine.SpyObj<ResourcesHttpService>;
    resourceService.findOffers.and.returnValue(of(buildResponse(null, false, 200, 'OK')));
    resourceService.findStores.and.returnValue(of(buildResponse(null, false, 200, 'OK')));

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
