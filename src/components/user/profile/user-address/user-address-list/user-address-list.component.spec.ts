import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAddressListComponent} from './user-address-list.component';
import {MessageService} from 'primeng/api';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';

describe('UserAddressListComponent', () => {
  let component: UserAddressListComponent;
  let fixture: ComponentFixture<UserAddressListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddressListComponent, TranslateModule.forRoot()],
      providers: [
        MessageService,
        QueryClient,
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserAddressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
