import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserHomeComponent} from './user-home.component';
import {provideRouter} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

describe('UserHomeComponent', () => {
  let component: UserHomeComponent;
  let fixture: ComponentFixture<UserHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHomeComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([{path: '**', component: UserHomeComponent}])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
