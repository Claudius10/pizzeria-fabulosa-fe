import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPizzaComponent } from './custom-pizza.component';

describe('CustomPizzaComponent', () => {
  let component: CustomPizzaComponent;
  let fixture: ComponentFixture<CustomPizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomPizzaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
