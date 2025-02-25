import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrderSuccessComponent } from './new-order-success.component';

describe('NewOrderSuccessComponent', () => {
  let component: NewOrderSuccessComponent;
  let fixture: ComponentFixture<NewOrderSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOrderSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOrderSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
