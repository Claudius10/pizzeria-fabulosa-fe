import {ProductsSearchPipe} from './products-search.pipe';
import {TestBed} from '@angular/core/testing';
import {TranslateService} from '@ngx-translate/core';
import {Filter} from '../../../../../services/filter/filter.service';
import {Product} from '../../../../../api/asset';

describe('ProductsSearchPipe', () => {
  let pipe: ProductsSearchPipe;
  let translateService: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    const translateServiceSpy = jasmine.createSpyObj('TranslateService', [
      'currentLang',
      'instant'
    ]);

    TestBed.configureTestingModule({
      providers: [
        {provide: TranslateService, useValue: translateServiceSpy},
      ]
    });

    translateService = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
    pipe = new ProductsSearchPipe(translateService);
  });

  it("givenNoItems_thenReturnEmpty", () => {
    expect(pipe.transform([], "", []).length).toBe(0);
  });

  it("givenItem_whenSearchTextMatches_thenReturnItem", () => {

    // Arrange

    const items: Product[] = [getMockProduct("Cuatro Quesos", ["Queso Azul", "Emmental"], ["Blue Cheese", "Emmental Cheese"], ["Gluten", "Lactosa"], ["Gluten", "Lactose"])];

    // Act

    const result0 = pipe.transform(items, "Cuatro Quesos", []);
    const result1 = pipe.transform(items, "cuatro Quesos", []);
    const result2 = pipe.transform(items, "Cuatro", []);
    const result3 = pipe.transform(items, "cuatro", []);
    const result4 = pipe.transform(items, "Cuat", []);
    const result5 = pipe.transform(items, "Cua", []);
    const result6 = pipe.transform(items, "cua", []);

    // Assert

    expect(result0[0].name['es']).toEqual("Cuatro Quesos");
    expect(result1[0].name['es']).toEqual("Cuatro Quesos");
    expect(result2[0].name['es']).toEqual("Cuatro Quesos");
    expect(result3[0].name['es']).toEqual("Cuatro Quesos");
    expect(result4[0].name['es']).toEqual("Cuatro Quesos");
    expect(result5[0].name['es']).toEqual("Cuatro Quesos");
    expect(result6[0].name['es']).toEqual("Cuatro Quesos");
  });

  it("givenItem_whenSearchTextDoesNotMatch_thenReturnEmpty", () => {

    // Arrange

    const items: Product[] = [getMockProduct("Cuatro Quesos", ["Queso Azul", "Emmental"], ["Blue Cheese", "Emmental Cheese"], ["Gluten", "Lactosa"], ["Gluten", "Lactose"])];

    // Act

    const result = pipe.transform(items, "Carbonara", []);

    // Assert

    expect(result.length).toBe(0);
  });

  it("givenItem_whenIncludedFilterMatchesInEs_thenReturnItem", () => {

    // Arrange

    const items: Product[] = [getMockProduct("Cuatro Quesos", ["Queso Azul", "Emmental"], ["Blue Cheese", "Emmental Cheese"], ["Gluten", "Lactosa"], ["Gluten", "Lactose"])];

    const filter: Filter = {
      type: "filter",
      name: "Queso Azul",
      include: true
    };

    translateService.currentLang = "es";
    translateService.instant.and.returnValue("Queso Azul");

    // Act

    const result = pipe.transform(items, "", [filter]);

    // Assert

    expect(result.length).toBe(1);
    expect(result[0].name['es']).toEqual("Cuatro Quesos");
  });

  it("givenItem_whenExcludedFilterMatchesInEs_thenReturnEmpty", () => {

    // Arrange

    const items: Product[] = [getMockProduct("Cuatro Quesos", ["Queso Azul", "Emmental"], ["Blue Cheese", "Emmental Cheese"], ["Gluten", "Lactosa"], ["Gluten", "Lactose"])];

    const filter: Filter = {
      type: "filter",
      name: "Queso Azul",
      include: false
    };

    translateService.currentLang = "es";
    translateService.instant.and.returnValue("Queso Azul");

    // Act

    const result = pipe.transform(items, "", [filter]);

    // Assert

    expect(result.length).toBe(0);
  });

  it("givenItem_whenIncludedFilterMatchesInEn_thenReturnItem", () => {

    // Arrange

    const items: Product[] = [getMockProduct("Cuatro Quesos", ["Queso Azul", "Emmental"], ["Blue Cheese", "Emmental Cheese"], ["Gluten", "Lactosa"], ["Gluten", "Lactose"])];

    const filter: Filter = {
      type: "filter",
      name: "Blue Cheese",
      include: true
    };

    translateService.currentLang = "en";
    translateService.instant.and.returnValue("Blue Cheese");

    // Act

    const result = pipe.transform(items, "", [filter]);

    // Assert

    expect(result.length).toBe(1);
    expect(result[0].name['es']).toEqual("Cuatro Quesos");
  });

  it("givenItem_whenExcludedFilterMatchesInEn_thenReturnEmpty", () => {

    // Arrange

    const items: Product[] = [getMockProduct("Cuatro Quesos", ["Queso Azul", "Emmental"], ["Blue Cheese", "Emmental Cheese"], ["Gluten", "Lactosa"], ["Gluten", "Lactose"])];

    const filter: Filter = {
      type: "filter",
      name: "Blue Cheese",
      include: false
    };

    translateService.currentLang = "en";
    translateService.instant.and.returnValue("Blue Cheese");

    // Act

    const result = pipe.transform(items, "", [filter]);

    // Assert

    expect(result.length).toBe(0);
  });

  it("givenItem_whenIncludedAllergenMatchesInEs_thenReturnItem", () => {

    // Arrange

    const items: Product[] = [getMockProduct("Cuatro Quesos", ["Queso Azul", "Emmental"], ["Blue Cheese", "Emmental Cheese"], ["Gluten", "Lactosa"], ["Gluten", "Lactose"])];

    const filter: Filter = {
      type: "allergen",
      name: "Lactosa",
      include: true
    };

    translateService.currentLang = "es";
    translateService.instant.and.returnValue("Lactosa");

    // Act

    const result = pipe.transform(items, "", [filter]);

    // Assert

    expect(result.length).toBe(1);
    expect(result[0].name['es']).toEqual("Cuatro Quesos");
  });

  it("givenItem_whenExcludedAllergenMatchesInEs_thenReturnEmpty", () => {

    // Arrange

    const items: Product[] = [getMockProduct("Cuatro Quesos", ["Queso Azul", "Emmental"], ["Blue Cheese", "Emmental Cheese"], ["Gluten", "Lactosa"], ["Gluten", "Lactose"])];

    const filter: Filter = {
      type: "allergen",
      name: "Lactosa",
      include: false
    };

    translateService.currentLang = "es";
    translateService.instant.and.returnValue("Lactosa");

    // Act

    const result = pipe.transform(items, "", [filter]);

    // Assert

    expect(result.length).toBe(0);
  });

  it("givenItem_whenIncludedAllergenMatchesInEn_thenReturnItem", () => {

    // Arrange

    const items: Product[] = [getMockProduct("Cuatro Quesos", ["Queso Azul", "Emmental"], ["Blue Cheese", "Emmental Cheese"], ["Gluten", "Lactosa"], ["Gluten", "Lactose"])];

    const filter: Filter = {
      type: "allergen",
      name: "Lactose",
      include: true
    };

    translateService.currentLang = "en";
    translateService.instant.and.returnValue("Lactose");

    // Act

    const result = pipe.transform(items, "", [filter]);

    // Assert

    expect(result.length).toBe(1);
    expect(result[0].name['es']).toEqual("Cuatro Quesos");
  });

  it("givenItem_whenExcludedAllergenMatchesInEn_thenReturnEmpty", () => {

    // Arrange

    const items: Product[] = [getMockProduct("Cuatro Quesos", ["Queso Azul", "Emmental"], ["Blue Cheese", "Emmental Cheese"], ["Gluten", "Lactosa"], ["Gluten", "Lactose"])];

    const filter: Filter = {
      type: "allergen",
      name: "Lactose",
      include: false
    };

    translateService.currentLang = "en";
    translateService.instant.and.returnValue("Lactose");

    // Act

    const result = pipe.transform(items, "", [filter]);

    // Assert

    expect(result.length).toBe(0);
  });

  it("givenItem_whenIncludedFilterMatchesAndSearchTextMatches_thenReturnItem", () => {

    // Arrange

    const items: Product[] = [getMockProduct("Cuatro Quesos", ["Queso Azul", "Emmental"], ["Blue Cheese", "Emmental Cheese"], ["Gluten", "Lactosa"], ["Gluten", "Lactose"])];

    const filter: Filter = {
      type: "filter",
      name: "Blue Cheese",
      include: true
    };

    translateService.currentLang = "en";
    translateService.instant.and.returnValue("Blue Cheese");

    // Act

    const result = pipe.transform(items, "Cua", [filter]);

    // Assert

    expect(result.length).toBe(1);
    expect(result[0].name['en']).toBe("Cuatro Quesos");
  });

  it("givenItem_whenIncludedFilterMatchesAndSearchTextDoesNotMatch_thenReturnEmpty", () => {

    // Arrange

    const items: Product[] = [getMockProduct("Cuatro Quesos", ["Queso Azul", "Emmental"], ["Blue Cheese", "Emmental Cheese"], ["Gluten", "Lactosa"], ["Gluten", "Lactose"])];

    const filter: Filter = {
      type: "filter",
      name: "Blue Cheese",
      include: true
    };

    translateService.currentLang = "en";
    translateService.instant.and.returnValue("Blue Cheese");

    // Act

    const result = pipe.transform(items, "Carbo", [filter]);

    // Assert

    expect(result.length).toBe(0);
  });

  it("givenItem_whenIncludedAllergenMatchesAndSearchTextMatches_thenReturnItem", () => {

    // Arrange

    const items: Product[] = [getMockProduct("Cuatro Quesos", ["Queso Azul", "Emmental"], ["Blue Cheese", "Emmental Cheese"], ["Gluten", "Lactosa"], ["Gluten", "Lactose"])];

    const filter: Filter = {
      type: "allergen",
      name: "Lactose",
      include: true
    };

    translateService.currentLang = "en";
    translateService.instant.and.returnValue("Lactose");

    // Act

    const result = pipe.transform(items, "Cua", [filter]);

    // Assert

    expect(result.length).toBe(1);
    expect(result[0].name['en']).toBe("Cuatro Quesos");
  });

  it("givenItem_whenIncludedAllergenMatchesAndSearchTextDoesNotMatch_thenReturnEmpty", () => {

    // Arrange

    const items: Product[] = [getMockProduct("Cuatro Quesos", ["Queso Azul", "Emmental"], ["Blue Cheese", "Emmental Cheese"], ["Gluten", "Lactosa"], ["Gluten", "Lactose"])];

    const filter: Filter = {
      type: "allergen",
      name: "Lactose",
      include: true
    };

    translateService.currentLang = "en";
    translateService.instant.and.returnValue("Lactose");

    // Act

    const result = pipe.transform(items, "Trufa", [filter]);

    // Assert

    expect(result.length).toBe(0);
  });

  it("givenItem_whenIncludedFilterMatchesAndSearchTextMatchesForOtherItem_thenReturnTheItemWhoseSearchTextMatches", () => {

    // Arrange

    const productOne = getMockProduct("Cuatro Quesos", ["Queso Azul", "Emmental"], ["Blue Cheese", "Emmental Cheese"], ["Gluten", "Lactosa"], ["Gluten", "Lactose"]);
    const productTwo = getMockProduct("Natura", ["Calabacín", "Tomate Natural", "Parmesano"], ["Zucchini", "Sliced Tomato", "Parmesan Cheese"], ["Gluten", "Lactosa"], ["Gluten", "Lactose"]);
    const items: Product[] = [productOne, productTwo];

    const filter: Filter = {
      type: "filter",
      name: "Parmesan Cheese",
      include: true
    };

    translateService.currentLang = "en";
    translateService.instant.and.returnValue("Parmesan Cheese");

    // Act

    const result = pipe.transform(items, "natu", [filter]);

    // Assert

    expect(result.length).toBe(1);
    expect(result[0].name['es']).toBe("Natura");
  });

  it("givenItem_whenExcludedFilterMatches_thenReturnOtherItem", () => {

    // Arrange

    const productOne = getMockProduct("Cuatro Quesos", ["Queso Azul", "Emmental"], ["Blue Cheese", "Emmental Cheese"], ["Gluten", "Lactosa"], ["Gluten", "Lactose"]);
    const productTwo = getMockProduct("Natura", ["Calabacín", "Tomate Natural", "Parmesano"], ["Zucchini", "Sliced Tomato", "Parmesan Cheese"], ["Gluten", "Lactosa"], ["Gluten", "Lactose"]);
    const items: Product[] = [productOne, productTwo];

    const filter: Filter = {
      type: "filter",
      name: "Parmesan Cheese",
      include: false
    };

    translateService.currentLang = "en";
    translateService.instant.and.returnValue("Parmesan Cheese");

    // Act

    const result = pipe.transform(items, "", [filter]);

    // Assert

    expect(result.length).toBe(1);
    expect(result[0].name['es']).toBe("Cuatro Quesos");
  });

  it("givenItem_whenExcludedAllergenMatches_thenReturnOtherItem", () => {

    // Arrange

    const productOne = getMockProduct("Cuatro Quesos", ["Queso Azul", "Emmental"], ["Blue Cheese", "Emmental Cheese"], ["Gluten", "Lactosa"], ["Gluten", "Lactose"]);
    const productTwo = getMockProduct("Natura", ["Calabacín", "Tomate Natural", "Parmesano"], ["Zucchini", "Sliced Tomato", "Parmesan Cheese"], ["Gluten"], ["Gluten"]);
    const items: Product[] = [productOne, productTwo];

    const filter: Filter = {
      type: "allergen",
      name: "Lactose",
      include: false
    };

    translateService.currentLang = "en";
    translateService.instant.and.returnValue("Lactose");

    // Act

    const result = pipe.transform(items, "", [filter]);

    // Assert

    expect(result.length).toBe(1);
    expect(result[0].name['es']).toBe("Natura");
  });
});

export function getMockProduct(name: string, ingEs: string[], ingEn: string[], allergenEs: string[], allergenEn: string[]): Product {
  return {
    id: 1,
    type: "pizza",
    name: {
      en: name,
      es: name,
    },
    description: {
      es: ingEs,
      en: ingEn
    },
    allergens: {
      es: allergenEs,
      en: allergenEn
    },
    image: "/assets/products/placeholder.png",
    prices: {
      s: 0,
      m: 0,
      l: 0
    },
    formats: {
      s: {
        en: "...",
        es: "...",
      },
      m: {
        en: "...",
        es: "...",
      },
      l: {
        en: "...",
        es: "...",
      }
    }
  };
}
