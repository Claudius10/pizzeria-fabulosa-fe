import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddressListViewComponent } from './user-address-list-view.component';

describe('UserAddressListViewComponent', () => {
  let component: UserAddressListViewComponent;
  let fixture: ComponentFixture<UserAddressListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddressListViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAddressListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
