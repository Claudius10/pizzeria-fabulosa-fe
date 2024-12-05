import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteptwowhereComponent } from './steptwowhere.component';

describe('SteptwowhereComponent', () => {
  let component: SteptwowhereComponent;
  let fixture: ComponentFixture<SteptwowhereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SteptwowhereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SteptwowhereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
