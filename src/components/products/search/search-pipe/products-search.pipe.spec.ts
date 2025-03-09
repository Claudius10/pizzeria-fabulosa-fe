import {ProductsSearchPipe} from './products-search.pipe';
import {TestBed} from '@angular/core/testing';
import {TranslateService} from '@ngx-translate/core';

describe('ProductsSearchPipe', () => {
  let pipe: ProductsSearchPipe;
  let translateService: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['']);

    TestBed.configureTestingModule({
      providers: [
        {provide: TranslateService, useValue: translateServiceSpy},
      ]
    });

    translateService = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
    pipe = new ProductsSearchPipe(translateService);
  });

  it("givenNoItems_thenReturnEmpty", () => {
    const productDTOS = pipe.transform([], "", []);
    expect(productDTOS.length).toBe(0);
  });
});
