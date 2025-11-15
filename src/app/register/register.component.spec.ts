import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RegisterComponent} from './register.component';
import {MessageService} from 'primeng/api';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../services/error/error.service';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {RegisterAPIService} from '../../api/security';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const messageSpy = jasmine.createSpyObj('MessageService', ['add']);
    const registerAPISpy = jasmine.createSpyObj('RegisterAPIService', ['registerAnonUser']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: MessageService, useValue: messageSpy},
        {provide: RegisterAPIService, useValue: registerAPISpy},
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
