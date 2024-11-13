import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserDetailsComponent} from './user-details.component';
import {By} from '@angular/platform-browser';

// In terms of Jasmine, a test consists of one or more suites. A suite is declared with a describe block:
// Each suite describes a piece of code, the code under test.
// Describe blocks can be nested to structure big suites and divide them into logical sections

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async () => {

    // Arrange

    await TestBed.configureTestingModule({
      imports: [UserDetailsComponent]
    }).compileComponents();

    // first declaration
    fixture = TestBed.createComponent(UserDetailsComponent);
    // second declaration
    component = fixture.componentInstance;

    // Act

    fixture.componentRef.setInput('name', "Cervantes");
    fixture.componentRef.setInput('email', "email");
    fixture.componentRef.setInput('contactNumber', "123");
    fixture.detectChanges();

  });

  // Assert

  // Each suit consists of one or more specifications, or short, specs. A spec is declared with an "it" block
  // The pronoun it refers to the code under test.

  it('givenNameInput_displayNameInputInDom', () => {
    const input = fixture.debugElement.query(By.css('[data-testid="name"]')).nativeElement;
    expect(input.textContent).toContain("Cervantes");
  });

  it('givenEmailInput_displayEmailInputInDom', () => {
    const input = fixture.debugElement.query(By.css('[data-testid="email"]')).nativeElement;
    expect(input.textContent).toContain("email");
  });

  it('givenEmailInput_displayEmailInputInDom', () => {
    const input = fixture.debugElement.query(By.css('[data-testid="contactNumber"]')).nativeElement;
    expect(input.textContent).toContain("123");
  });
});
