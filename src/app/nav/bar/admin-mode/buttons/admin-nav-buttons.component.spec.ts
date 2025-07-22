import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminNavButtonsComponent} from './admin-nav-buttons.component';

describe('AdminNavButtons', () => {
  let component: AdminNavButtonsComponent;
  let fixture: ComponentFixture<AdminNavButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNavButtonsComponent]
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
