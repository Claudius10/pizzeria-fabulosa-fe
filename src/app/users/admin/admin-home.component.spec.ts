import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminHomeComponent} from './admin-home.component';
import {provideRouter} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

describe('AdminHomeComponent', () => {
  let component: AdminHomeComponent;
  let fixture: ComponentFixture<AdminHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHomeComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([{path: '**', component: AdminHomeComponent}])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
