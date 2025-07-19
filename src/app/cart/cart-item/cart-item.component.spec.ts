import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CartItemComponent} from './cart-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {getMockCartItem} from '../../services/cart/cart.service.spec';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemComponent, TranslateModule.forRoot()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("item", getMockCartItem(1, 1));
    fixture.componentRef.setInput("viewOnly", false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
