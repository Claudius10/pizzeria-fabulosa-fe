import {ProductItemComponent} from './product-item.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe('ProductComponent', () => {
  let component: ProductItemComponent;
  let fixture: MockedComponentFixture<ProductItemComponent, {}>;

  beforeEach(() => {
    return MockBuilder(ProductItemComponent);
  });

  beforeEach(() => {
    fixture = MockRender(ProductItemComponent, {
      product: {
        id: 1,
        productType: "pizza",
        image: "img",
        name: "Cuatro Quesos",
        description: "Quesos",
        price: 20,
        format: "Mediana",
      }
    });
    component = fixture.point.componentInstance;
  });

  it('givenSetup_createComponent', () => {
    expect(component).toBeDefined();
  });

  it('givenProductInput_thenReturnName', () => {
    expect(component.product().name).toBe("Cuatro Quesos");
  });
});
