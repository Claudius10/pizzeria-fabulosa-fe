import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAddressListViewComponent} from './user-address-list-view.component';
import {MessageService} from 'primeng/api';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';

describe('UserAddressListViewComponent', () => {
  let component: UserAddressListViewComponent;
  let fixture: ComponentFixture<UserAddressListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddressListViewComponent, TranslateModule.forRoot()],
      providers: [
        MessageService,
        QueryClient,
        provideHttpClient(),
        provideHttpClientTesting()
      ],
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
