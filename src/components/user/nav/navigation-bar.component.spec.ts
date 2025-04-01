import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavigationBarComponent} from './navigation-bar.component';
import {TranslateModule} from '@ngx-translate/core';
import {provideRouter} from '@angular/router';
import {MessageService} from 'primeng/api';

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;

  beforeEach(async () => {
    const messageSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      imports: [NavigationBarComponent, TranslateModule.forRoot()],
      providers: [
        {provide: MessageService, useValue: messageSpy},
        provideRouter([{path: '**', component: NavigationBarComponent}])
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
