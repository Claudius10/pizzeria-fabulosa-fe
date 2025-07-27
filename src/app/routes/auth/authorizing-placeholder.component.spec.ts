import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizingPlaceholderComponent } from './authorizing-placeholder.component';

describe('AuthorizingPlaceholderComponent', () => {
  let component: AuthorizingPlaceholderComponent;
  let fixture: ComponentFixture<AuthorizingPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorizingPlaceholderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizingPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
