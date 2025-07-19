import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SmallScreenStepsComponent} from './small-screen-steps.component';
import {TranslateModule} from '@ngx-translate/core';

describe('SmallScreenStepsComponent', () => {
  let component: SmallScreenStepsComponent;
  let fixture: ComponentFixture<SmallScreenStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallScreenStepsComponent, TranslateModule.forRoot()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SmallScreenStepsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("activeIndex", 0);
    fixture.componentRef.setInput("items", [{label: "test"}]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
