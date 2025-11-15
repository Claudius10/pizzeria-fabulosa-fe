import {ComponentFixture, TestBed} from '@angular/core/testing';

import StatisticsDoughnutComponent from './statistics-doughnut.component';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {TranslateModule} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('StatisticsDoughnutComponent', () => {
  let component: StatisticsDoughnutComponent;
  let fixture: ComponentFixture<StatisticsDoughnutComponent>;

  beforeEach(async () => {
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      imports: [StatisticsDoughnutComponent, TranslateModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: QueryClient},
        {provide: MessageService, useValue: messageServiceSpy},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StatisticsDoughnutComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput("header", "test");
    fixture.componentRef.setInput("queryKey", ["test"]);
    fixture.componentRef.setInput("dataLabels", []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
