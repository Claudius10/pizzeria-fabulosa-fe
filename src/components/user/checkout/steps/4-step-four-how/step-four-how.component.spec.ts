import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateModule} from '@ngx-translate/core';
import {StepFourHowComponent} from './step-four-how.component';

describe('Step-four-when', () => {
  let component: StepFourHowComponent;
  let fixture: ComponentFixture<StepFourHowComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [StepFourHowComponent, TranslateModule.forRoot()],
      providers: []
    })
      .compileComponents();

    fixture = TestBed.createComponent(StepFourHowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
