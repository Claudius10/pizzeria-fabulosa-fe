import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderSummaryListComponent} from './order-summary-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('OrderListComponent', () => {
  let component: OrderSummaryListComponent;
  let fixture: ComponentFixture<OrderSummaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderSummaryListComponent, TranslateModule.forRoot()],
      providers:
        [
          MessageService,
          QueryClient,
          provideHttpClient(),
          provideHttpClientTesting()
        ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrderSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
