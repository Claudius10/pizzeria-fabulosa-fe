import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavQuickLinksComponent} from './nav-quick-links.component';

describe('NavQuickLinksComponent', () => {
  let component: NavQuickLinksComponent;
  let fixture: ComponentFixture<NavQuickLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavQuickLinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavQuickLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
