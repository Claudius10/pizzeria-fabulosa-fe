import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StepTwoWhereComponent} from './step-two-where.component';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {MessageService} from 'primeng/api';

describe('Step-two-where', () => {
  let component: StepTwoWhereComponent;
  let fixture: ComponentFixture<StepTwoWhereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepTwoWhereComponent, TranslateModule.forRoot()],
      providers: [
        MessageService,
        QueryClient,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StepTwoWhereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
