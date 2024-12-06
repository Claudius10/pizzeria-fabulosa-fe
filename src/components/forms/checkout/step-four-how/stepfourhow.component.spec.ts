import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepfourhowComponent } from './stepfourhow.component';

describe('StepfourhowComponent', () => {
  let component: StepfourhowComponent;
  let fixture: ComponentFixture<StepfourhowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepfourhowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepfourhowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
