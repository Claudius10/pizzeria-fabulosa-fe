import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckoutFormComponent} from './checkout-form.component';
import {TranslateModule} from '@ngx-translate/core';
import {provideRouter} from '@angular/router';

describe('AnonUserCheckoutFormComponent', () => {
  let component: CheckoutFormComponent;
  let fixture: ComponentFixture<CheckoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutFormComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([{path: '**', component: CheckoutFormComponent}])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CheckoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
