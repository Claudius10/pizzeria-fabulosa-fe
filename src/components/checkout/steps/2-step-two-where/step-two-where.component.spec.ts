import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StepTwoWhereComponent} from './step-two-where.component';

describe('Step-two-where', () => {
  let component: StepTwoWhereComponent;
  let fixture: ComponentFixture<StepTwoWhereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepTwoWhereComponent]
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
