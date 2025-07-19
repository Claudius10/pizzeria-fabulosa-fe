import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordAuthorizationComponent } from './password-authorization.component';

describe('PasswordAuthorizationComponent', () => {
  let component: PasswordAuthorizationComponent;
  let fixture: ComponentFixture<PasswordAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordAuthorizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
