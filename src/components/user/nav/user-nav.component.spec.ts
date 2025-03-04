import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserNavComponent} from './user-nav.component';
import {TranslateModule} from '@ngx-translate/core';
import {provideRouter} from '@angular/router';

describe('UserNavComponent', () => {
  let component: UserNavComponent;
  let fixture: ComponentFixture<UserNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserNavComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([{path: '**', component: UserNavComponent}])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
