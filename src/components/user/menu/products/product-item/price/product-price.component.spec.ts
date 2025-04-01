import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductPriceComponent} from './product-price.component';

describe('ProductPriceComponent', () => {
  let component: ProductPriceComponent;
  let fixture: ComponentFixture<ProductPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPriceComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductPriceComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("price", 1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
