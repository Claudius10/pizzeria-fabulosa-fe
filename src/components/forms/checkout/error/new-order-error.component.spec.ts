import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrderErrorComponent } from './new-order-error.component';

describe('NewOrderErrorComponent', () => {
  let component: NewOrderErrorComponent;
  let fixture: ComponentFixture<NewOrderErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOrderErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOrderErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
