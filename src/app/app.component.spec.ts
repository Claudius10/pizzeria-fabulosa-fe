import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MessageService} from 'primeng/api';
import {provideRouter} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {UserAPIService} from '../api/security';
import {of} from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let userAccountAPIService: jasmine.SpyObj<UserAPIService>;

  beforeEach(async () => {
    const messageSpy = jasmine.createSpyObj('MessageService', ['add']);
    const userAccountAPIServiceSpy = jasmine.createSpyObj('UserAccountAPIService', ['getUserInfo']);

    await TestBed.configureTestingModule({
      imports: [AppComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        {provide: MessageService, useValue: messageSpy},
        {provide: UserAPIService, useValue: userAccountAPIServiceSpy},
        provideRouter([{path: '**', component: AppComponent}])
      ],
    }).compileComponents();

    userAccountAPIService = TestBed.inject(UserAPIService) as jasmine.SpyObj<UserAPIService>;
    userAccountAPIService.getUserInfo.and.returnValue(of());

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeDefined();
  });
});
