import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminNavButtonsComponent} from './admin-nav-buttons.component';
import {provideRouter} from '@angular/router';

describe('AdminNavButtons', () => {
  let component: AdminNavButtonsComponent;
  let fixture: ComponentFixture<AdminNavButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNavButtonsComponent],
      providers: [
        provideRouter([{path: '**', component: AdminNavButtonsComponent}])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminNavButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
