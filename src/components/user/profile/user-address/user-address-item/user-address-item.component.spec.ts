import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAddressItemComponent} from './user-address-item.component';

describe('AddressItemComponent', () => {
  let component: UserAddressItemComponent;
  let fixture: ComponentFixture<UserAddressItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddressItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAddressItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
