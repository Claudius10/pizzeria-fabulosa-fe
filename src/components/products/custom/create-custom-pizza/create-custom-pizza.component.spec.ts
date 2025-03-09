import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateCustomPizzaComponent} from './create-custom-pizza.component';
import {TranslateModule} from '@ngx-translate/core';

describe('CreateCustomPizzaComponent', () => {
  let component: CreateCustomPizzaComponent;
  let fixture: ComponentFixture<CreateCustomPizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCustomPizzaComponent, TranslateModule.forRoot()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateCustomPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
