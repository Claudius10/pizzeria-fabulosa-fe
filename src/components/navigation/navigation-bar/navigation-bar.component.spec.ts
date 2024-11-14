import {TestBed} from '@angular/core/testing';

import {NavigationBarComponent} from './navigation-bar.component';
import {AuthService} from '../../../services/auth/auth.service';
import {signal} from '@angular/core';
import {provideRouter} from '@angular/router';
import {MockBuilder, MockInstance, MockRender} from 'ng-mocks';

describe('NavigationBarComponent', () => {
  it('test', () => {
    const authService = jasmine.createSpyObj<AuthService>("AuthService", ["getIsAuthenticated"]);

    TestBed.configureTestingModule({
      imports: [NavigationBarComponent],
      providers: [
        {provide: AuthService, useValue: authService},
        provideRouter([{path: '**', component: NavigationBarComponent}]),
      ]
    }).compileComponents();

    authService.getIsAuthenticated.and.returnValue(signal(true));

    const fixture = TestBed.createComponent(NavigationBarComponent);
    const component = fixture.componentInstance;

    expect(component.isAuthenticated()).toBeTrue();
  });

  it('test two', () => {
    TestBed.configureTestingModule(MockBuilder(NavigationBarComponent).mock(AuthService, {
      getIsAuthenticated: () => signal(true)
    }).build()).compileComponents();

    const fixture = MockRender(NavigationBarComponent);
    const component = fixture.componentInstance;

    expect(component.isAuthenticated()).toBeTrue();
  });
});

describe('NavigationBarComponent Two', () => {
  beforeEach(() => {
    return MockBuilder(NavigationBarComponent).mock(AuthService);
  });

  it('test two', () => {
    MockInstance(AuthService, "getIsAuthenticated", () => signal(true));
    const fixture = MockRender(NavigationBarComponent);
    const component = fixture.componentInstance;
    expect(component.isAuthenticated()).toBeTrue();
  });

  it('test three', () => {
    MockInstance(AuthService, "getIsAuthenticated", () => signal(false));
    const fixture = MockRender(NavigationBarComponent);
    const component = fixture.componentInstance;
    expect(component.isAuthenticated()).toBeFalse();
  });
});


