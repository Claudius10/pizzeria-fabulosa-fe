import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNavButtonsComponent } from './user-nav-buttons.component';

describe('UserNavButtonsComponent', () => {
  let component: UserNavButtonsComponent;
  let fixture: ComponentFixture<UserNavButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserNavButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserNavButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
