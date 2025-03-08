import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ErrorItemComponent} from './error-item.component';
import {ErrorDTO} from '../../../../interfaces/http/api';

describe('ErrorItemComponent', () => {
  let component: ErrorItemComponent;
  let fixture: ComponentFixture<ErrorItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [ErrorItemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ErrorItemComponent);
    component = fixture.componentInstance;
    const error: ErrorDTO = {
      id: 1,
      fatal: false,
      path: "/",
      origin: "",
      message: "",
      cause: "",
      logged: false,
    };
    fixture.componentRef.setInput("error", error);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
