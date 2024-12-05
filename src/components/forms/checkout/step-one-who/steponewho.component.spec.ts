import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteponewhoComponent } from './steponewho.component';

describe('SteponewhoComponent', () => {
  let component: SteponewhoComponent;
  let fixture: ComponentFixture<SteponewhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SteponewhoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SteponewhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
