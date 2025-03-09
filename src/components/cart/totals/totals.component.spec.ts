import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TotalsComponent} from './totals.component';
import {TranslateModule} from '@ngx-translate/core';

describe('TotalsComponent', () => {
  let component: TotalsComponent;
  let fixture: ComponentFixture<TotalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalsComponent, TranslateModule.forRoot()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TotalsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("total", 1);
    fixture.componentRef.setInput("threeForTwoOffers", 0);
    fixture.componentRef.setInput("secondForHalfPriceOffer", 0);
    fixture.componentRef.setInput("totalAfterOffers", 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
