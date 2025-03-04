import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepFiveSummaryComponent } from './step-five-summary.component';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {TranslateModule} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';

describe('StepFiveSummaryComponent', () => {
  let component: StepFiveSummaryComponent;
  let fixture: ComponentFixture<StepFiveSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepFiveSummaryComponent, TranslateModule.forRoot()],
      providers: [
        MessageService,
        QueryClient,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepFiveSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
