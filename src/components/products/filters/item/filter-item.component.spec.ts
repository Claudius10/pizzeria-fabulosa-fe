import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterItemComponent} from './filter-item.component';
import {TranslateModule} from '@ngx-translate/core';

describe('FilterItemComponent', () => {
  let component: FilterItemComponent;
  let fixture: ComponentFixture<FilterItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterItemComponent, TranslateModule.forRoot()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(FilterItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("item", "");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
