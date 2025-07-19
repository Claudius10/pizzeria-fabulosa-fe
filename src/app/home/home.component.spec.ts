import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../services/error/error.service';
import {of} from 'rxjs';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {OfferAPIService, StoreAPIService} from '../../api/public';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let storeAPIService: jasmine.SpyObj<StoreAPIService>;
  let offerAPIService: jasmine.SpyObj<OfferAPIService>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const storeAPISpy = jasmine.createSpyObj('storeAPI', ['findAll']);
    const offerAPISpy = jasmine.createSpyObj('offerAPI', ['findAll1']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: StoreAPIService, useValue: storeAPISpy},
        {provide: OfferAPIService, useValue: offerAPISpy},
      ],
    })
      .compileComponents();

    storeAPIService = TestBed.inject(StoreAPIService) as jasmine.SpyObj<StoreAPIService>;
    offerAPIService = TestBed.inject(OfferAPIService) as jasmine.SpyObj<OfferAPIService>;
    storeAPIService.findAll.and.returnValue(of());
    offerAPIService.findAll1.and.returnValue(of());

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
