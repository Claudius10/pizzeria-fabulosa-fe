import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ErrorComponent} from './error.component';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../services/error/error.service';
import {signal} from '@angular/core';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let errorService: jasmine.SpyObj<ErrorService>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);

    await TestBed.configureTestingModule({
      imports: [ErrorComponent, TranslateModule.forRoot()],
      providers: [
        {provide: ErrorService, useValue: errorServiceSpy},
      ]
    })
      .compileComponents();

    errorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;
    errorService.getErrors.and.returnValue(signal([]));

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
