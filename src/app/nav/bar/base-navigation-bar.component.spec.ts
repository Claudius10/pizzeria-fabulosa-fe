import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseNavigationBarComponent} from './base-navigation-bar.component';
import {TranslateModule} from '@ngx-translate/core';
import {provideRouter} from '@angular/router';
import {MessageService} from 'primeng/api';

describe('BaseNavigationBar', () => {
  let component: BaseNavigationBarComponent;
  let fixture: ComponentFixture<BaseNavigationBarComponent>;

  beforeEach(async () => {
    const messageSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      imports: [BaseNavigationBarComponent, TranslateModule.forRoot()],
      providers: [
        {provide: MessageService, useValue: messageSpy},
        provideRouter([{path: '**', component: BaseNavigationBarComponent}])
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BaseNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
