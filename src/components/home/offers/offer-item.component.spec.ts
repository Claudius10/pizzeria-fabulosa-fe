import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OfferItemComponent} from './offer-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {OfferDTO} from '../../../interfaces/dto/resources';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

describe('OfferItemComponent', () => {
  let component: OfferItemComponent;
  let fixture: ComponentFixture<OfferItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferItemComponent, TranslateModule.forRoot()],
      providers: [
        provideAnimationsAsync()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OfferItemComponent);
    component = fixture.componentInstance;
    const offer: OfferDTO = {
      caveat: {
        en: "",
        es: ""
      },
      name: {
        en: "",
        es: ""
      },
      id: 1,
      description: {
        es: "",
        en: ""
      },
      image: "assets/image.jpg",
    };
    fixture.componentRef.setInput("offer", offer);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
