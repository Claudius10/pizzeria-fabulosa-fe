import {TestBed} from '@angular/core/testing';

import {NavigationBarComponent} from './navigation-bar.component';
import {provideRouter} from '@angular/router';

describe('NavigationBarComponent', () => {

  it('test', () => {

    TestBed.configureTestingModule({
      imports: [NavigationBarComponent],
      providers: [
        provideRouter([{path: '**', component: NavigationBarComponent}]),
      ]
    })
      .overrideComponent(NavigationBarComponent, {
        // set: {providers: [{provide: AuthService, useClass: AuthServiceSpy}]}
      })
      .compileComponents();


    const fixture = TestBed.createComponent(NavigationBarComponent);
    const component = fixture.componentInstance;

    // expect(component.isAuthenticated()).toBeTrue();
  });

  // it('test two', () => {
  //   TestBed.configureTestingModule(MockBuilder(NavigationBarComponent).mock(AuthService, {
  //     getIsAuthenticated: () => signal(true)
  //   }).build()).compileComponents();
  //
  //   const fixture = MockRender(NavigationBarComponent);
  //   const component = fixture.componentInstance;
  //
  //   expect(component.isAuthenticated()).toBeTrue();
  // });

});

// describe('NavigationBarComponent Two', () => {
//   beforeEach(() => {
//     return MockBuilder(NavigationBarComponent).mock(AuthService);
//   });    set: {providers: [{provide: AuthService, useClass: AuthServiceSpy}]}
//
//   it('test two', () => {
//     MockInstance(AuthService, "getIsAuthenticated", () => signal(true));
//     const fixture = MockRender(NavigationBarComponent);
//     const component = fixture.componentInstance;
//     expect(component.isAuthenticated()).toBeTrue();
//   });
//
//   it('test three', () => {
//     MockInstance(AuthService, "getIsAuthenticated", () => signal(false));
//     const fixture = MockRender(NavigationBarComponent);
//     const component = fixture.componentInstance;
//     expect(component.isAuthenticated()).toBeFalse();
//   });
// });

// @Injectable()
// class AuthServiceSpy extends AuthService {
//   override isAuthenticated = true;
//   override getIsAuthenticated = jasmine.createSpy().and.returnValue(this.isAuthenticated);
// }
