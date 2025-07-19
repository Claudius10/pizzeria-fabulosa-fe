import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateModule} from '@ngx-translate/core';
import {StepOneWhoComponent} from './step-one-who.component';

describe('Step-one-who', () => {
  let component: StepOneWhoComponent;
  let fixture: ComponentFixture<StepOneWhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepOneWhoComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StepOneWhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
