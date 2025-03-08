import {TestBed} from '@angular/core/testing';

import {ThemeService} from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('givenDarkModeOn_thenSetDarkModeOn', () => {

    // Arrange

    const html = document.querySelector('html');

    // Act

    service.toggleDarkMode(true);

    // Assert

    expect(service.isDarkMode()).toBeTrue();
    expect(html!.classList.contains('my-app-dark')).toBeTrue();
  });

  it('givenDarkModeOff_thenSetDarkModeOff', () => {

    // Arrange

    const html = document.querySelector('html');

    // Act

    service.toggleDarkMode(false);

    // Assert

    expect(service.isDarkMode()).toBeFalse();
    expect(html!.classList.contains('my-app-dark')).toBeFalse();
  });
});
