import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminNavComponent} from './admin-nav.component';
import {provideRouter} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

describe('AdminNavComponent', () => {
  let component: AdminNavComponent;
  let fixture: ComponentFixture<AdminNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNavComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([{path: '**', component: AdminNavComponent}])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
