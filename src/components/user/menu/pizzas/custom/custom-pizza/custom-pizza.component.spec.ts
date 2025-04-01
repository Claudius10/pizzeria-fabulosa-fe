import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomPizzaComponent} from './custom-pizza.component';
import {TranslateModule} from '@ngx-translate/core';

describe('CustomPizzaComponent', () => {
  let component: CustomPizzaComponent;
  let fixture: ComponentFixture<CustomPizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomPizzaComponent, TranslateModule.forRoot()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CustomPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
