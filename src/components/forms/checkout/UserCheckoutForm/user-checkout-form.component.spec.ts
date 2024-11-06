import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCheckoutFormComponent } from './user-checkout-form.component';

describe('UserCheckoutFormComponent', () => {
  let component: UserCheckoutFormComponent;
  let fixture: ComponentFixture<UserCheckoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCheckoutFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCheckoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
