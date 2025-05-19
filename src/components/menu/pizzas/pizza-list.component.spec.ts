import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PizzaListComponent} from './pizza-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../../services/error/error.service';
import {of} from 'rxjs';
import {provideRouter} from '@angular/router';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {ResourcesAPIService} from '../../../api';

describe('PizzaListComponent', () => {
  let component: PizzaListComponent;
  let fixture: ComponentFixture<PizzaListComponent>;
  let resourceService: jasmine.SpyObj<ResourcesAPIService>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const resourceServiceSpy = jasmine.createSpyObj('ResourceService', ['findAllProductsByType']);

    await TestBed.configureTestingModule({
      imports: [PizzaListComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        provideRouter([{path: '**', component: PizzaListComponent}]),
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: ResourcesAPIService, useValue: resourceServiceSpy},
      ],
    })
      .compileComponents();

    resourceService = TestBed.inject(ResourcesAPIService) as jasmine.SpyObj<ResourcesAPIService>;
    resourceService.findAllProductsByType.and.returnValue(of());

    fixture = TestBed.createComponent(PizzaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
