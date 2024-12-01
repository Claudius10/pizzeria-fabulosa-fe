import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallScreenStepsComponent } from './small-screen-steps.component';

describe('SmallScreenStepsComponent', () => {
  let component: SmallScreenStepsComponent;
  let fixture: ComponentFixture<SmallScreenStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallScreenStepsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallScreenStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
