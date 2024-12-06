import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepthreewhenComponent } from './stepthreewhen.component';

describe('StepthreewhenComponent', () => {
  let component: StepthreewhenComponent;
  let fixture: ComponentFixture<StepthreewhenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepthreewhenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepthreewhenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
