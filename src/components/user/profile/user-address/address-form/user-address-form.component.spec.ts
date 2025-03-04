import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAddressFormComponent} from './user-address-form.component';
import {MessageService} from 'primeng/api';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';

describe('UserAddressFormComponent', () => {
  let component: UserAddressFormComponent;
  let fixture: ComponentFixture<UserAddressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddressFormComponent, TranslateModule.forRoot()],
      providers: [
        MessageService,
        QueryClient,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
