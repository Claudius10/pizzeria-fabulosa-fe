import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MessageService} from 'primeng/api';
import {provideRouter} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

describe('AppComponent', () => {

  beforeEach(async () => {
    const messageSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        AppComponent,
        {provide: MessageService, useValue: messageSpy},
        provideRouter([{path: '**', component: AppComponent}])
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
