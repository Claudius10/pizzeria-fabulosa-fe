import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ForibiddenComponent} from './foribidden.component';

describe('ForibiddenComponent', () => {
  let component: ForibiddenComponent;
  let fixture: ComponentFixture<ForibiddenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForibiddenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForibiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
