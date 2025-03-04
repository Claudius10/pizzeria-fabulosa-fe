import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterListComponent} from './filter-list.component';
import {TranslateModule} from '@ngx-translate/core';

describe('FilterListComponent', () => {
  let component: FilterListComponent;
  let fixture: ComponentFixture<FilterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterListComponent, TranslateModule.forRoot()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FilterListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("header", "test");
    fixture.componentRef.setInput("items", [""]);
    fixture.componentRef.setInput("inverseCardBg", true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
