import {ComponentFixture, TestBed} from '@angular/core/testing';

import StatisticsBarComponent from './statistics-bar.component';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {TranslateModule} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('StatisticsBarComponent', () => {
  let component: StatisticsBarComponent;
  let fixture: ComponentFixture<StatisticsBarComponent>;

  beforeEach(async () => {
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      imports: [StatisticsBarComponent, TranslateModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: QueryClient},
        {provide: MessageService, useValue: messageServiceSpy},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StatisticsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
