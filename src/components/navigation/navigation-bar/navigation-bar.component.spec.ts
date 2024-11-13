import {TestBed} from '@angular/core/testing';

import {NavigationBarComponent} from './navigation-bar.component';
import {AuthService} from '../../../services/auth/auth.service';
import {signal} from '@angular/core';
import {provideRouter} from '@angular/router';

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

    authService.getIsAuthenticated.and.returnValues(signal(true), signal(false));

    const fixture = TestBed.createComponent(NavigationBarComponent);
    const component = fixture.componentInstance;

    expect(component.isAuthenticated()).toBeTrue(); // OK!
    fixture.detectChanges();
    expect(component.isAuthenticated()).toBeFalse(); // NOT OK!
  });
});
