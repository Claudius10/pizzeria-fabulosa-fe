import {OrderComponent} from './order.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateModule} from '@ngx-translate/core';
import {provideRouter} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ErrorService} from '../../../services/error/error.service';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {QueryClient} from '@tanstack/angular-query-experimental';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const confirmationServiceSpy = jasmine.createSpyObj('ConfirmationService', ['confirm']);
    const messageSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      imports: [OrderComponent, TranslateModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: QueryClient},
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: ConfirmationService, useValue: confirmationServiceSpy},
        {provide: MessageService, useValue: messageSpy},
        provideRouter([{path: '**', component: OrderComponent}])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
