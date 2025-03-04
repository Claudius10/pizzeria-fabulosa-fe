import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductsFilterComponent} from './products-filter.component';
import {TranslateModule} from '@ngx-translate/core';
import {FilterListComponent} from './list/filter-list.component';

describe('ProductsFilterComponent', () => {
  let component: ProductsFilterComponent;
  let fixture: ComponentFixture<ProductsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterListComponent, TranslateModule.forRoot()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
