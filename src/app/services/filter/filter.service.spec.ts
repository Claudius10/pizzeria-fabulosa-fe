import {TestBed} from '@angular/core/testing';

import {FilterService} from './filter.service';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('givenSearchText_thenSetTheText', () => {

    // Act

    service.setSearchText("Test text here");

    // Assert

    expect(service.searchText()).toEqual("Test text here");
  });

  it('givenToggleFilter_whenFiltersIsEmpty_thenAddFilterAsIncluded', () => {

    // Act

    service.toggleFilter("testFilter", "test");

    // Assert

    expect(service.areFiltersEmpty()).toBeFalse();
    expect(service.filters()[0].name).toEqual("testFilter");
    expect(service.filters()[0].type).toEqual("test");
    expect(service.filters()[0].include).toBeTrue();
  });

  it('givenToggleFilter_whenFilterIsAlreadyIncluded_thenSetFilterAsExcluded', () => {

    // Arrange

    // include the filter
    service.toggleFilter("testFilter", "test");
    expect(service.areFiltersEmpty()).toBeFalse();
    expect(service.filters()[0].name).toEqual("testFilter");
    expect(service.filters()[0].type).toEqual("test");
    expect(service.filters()[0].include).toBeTrue();

    // Act

    service.toggleFilter("testFilter", "test");

    // Assert

    expect(service.areFiltersEmpty()).toBeFalse();
    expect(service.filters()[0].name).toEqual("testFilter");
    expect(service.filters()[0].type).toEqual("test");
    expect(service.filters()[0].include).toBeFalse();
  });

  it('givenToggleFilter_whenFilterIsAlreadyExcluded_thenRemoveTheFilter', () => {

    // Arrange

    // include the filter
    service.toggleFilter("testFilter", "test");
    expect(service.areFiltersEmpty()).toBeFalse();
    expect(service.filters()[0].name).toEqual("testFilter");
    expect(service.filters()[0].type).toEqual("test");
    expect(service.filters()[0].include).toBeTrue();

    // exclude the filter
    service.toggleFilter("testFilter", "test");
    expect(service.areFiltersEmpty()).toBeFalse();
    expect(service.filters()[0].name).toEqual("testFilter");
    expect(service.filters()[0].type).toEqual("test");
    expect(service.filters()[0].include).toBeFalse();

    // Act

    service.toggleFilter("testFilter", "test");

    // Assert

    expect(service.areFiltersEmpty()).toBeTrue();
  });
});
