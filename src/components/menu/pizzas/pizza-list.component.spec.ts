import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PizzaListComponent} from './pizza-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../../services/error/error.service';
import {of} from 'rxjs';
import {provideRouter} from '@angular/router';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {ProductAPIService} from '../../../api/public';

describe('PizzaListComponent', () => {
  let component: PizzaListComponent;
  let fixture: ComponentFixture<PizzaListComponent>;
  let productAPI: jasmine.SpyObj<ProductAPIService>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const productAPISpy = jasmine.createSpyObj('productAPI', ['findAllByType']);

    await TestBed.configureTestingModule({
      imports: [PizzaListComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        provideRouter([{path: '**', component: PizzaListComponent}]),
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: ProductAPIService, useValue: productAPISpy},
      ],
    })
      .compileComponents();

    productAPI = TestBed.inject(ProductAPIService) as jasmine.SpyObj<ProductAPIService>;
    productAPI.findAllByType.and.returnValue(of());

    fixture = TestBed.createComponent(PizzaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
