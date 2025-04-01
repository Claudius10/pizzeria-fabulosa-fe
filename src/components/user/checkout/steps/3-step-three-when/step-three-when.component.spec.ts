import {ComponentFixture, TestBed} from '@angular/core/testing';


import {TranslateModule} from '@ngx-translate/core';
import {StepThreeWhenComponent} from './step-three-when.component';

describe('Step-three-when', () => {
  let component: StepThreeWhenComponent;
  let fixture: ComponentFixture<StepThreeWhenComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [StepThreeWhenComponent, TranslateModule.forRoot()],
      providers: []
    })
      .compileComponents();

    fixture = TestBed.createComponent(StepThreeWhenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
