import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductsSearchComponent} from './products-search.component';
import {TranslateModule} from '@ngx-translate/core';

describe('ProductsFilterComponent', () => {
  let component: ProductsSearchComponent;
  let fixture: ComponentFixture<ProductsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsSearchComponent, TranslateModule.forRoot()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
