import {ProductsSearchPipe} from './products-search.pipe';
import {TestBed} from '@angular/core/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

describe('ProductsSearchPipe', () => {
  let pipe: ProductsSearchPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
    });

    const translateService = TestBed.inject(TranslateService);
    pipe = new ProductsSearchPipe(translateService);
  });


  it("givenNoItems_thenReturnEmpty", () => {
    const productDTOS = pipe.transform([], "", []);
    expect(productDTOS.length).toBe(0);
  });
});
