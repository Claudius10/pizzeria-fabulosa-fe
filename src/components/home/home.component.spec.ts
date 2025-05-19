import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../services/error/error.service';
import {of} from 'rxjs';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {ResourcesAPIService} from '../../api';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let resourceService: jasmine.SpyObj<ResourcesAPIService>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const resourceServiceSpy = jasmine.createSpyObj('ResourceService', ['findAllStores', 'findAllOffers']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: ResourcesAPIService, useValue: resourceServiceSpy},
      ],
    })
      .compileComponents();

    resourceService = TestBed.inject(ResourcesAPIService) as jasmine.SpyObj<ResourcesAPIService>;
    resourceService.findAllOffers.and.returnValue(of());
    resourceService.findAllStores.and.returnValue(of());

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
