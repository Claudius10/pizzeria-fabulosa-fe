import {ComponentFixture, TestBed} from '@angular/core/testing';

import OrderStatsComponent from './order-stats.component';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {TranslateModule} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('OrderStatsComponent', () => {
  let component: OrderStatsComponent;
  let fixture: ComponentFixture<OrderStatsComponent>;

  beforeEach(async () => {
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      imports: [OrderStatsComponent, TranslateModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: QueryClient},
        {provide: MessageService, useValue: messageServiceSpy},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrderStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
