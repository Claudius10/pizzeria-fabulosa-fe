import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StoreItemComponent} from './store-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {StoreDTO} from '../../../utils/interfaces/dto/resources';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

describe('StoreItemComponent', () => {
  let component: StoreItemComponent;
  let fixture: ComponentFixture<StoreItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreItemComponent, TranslateModule.forRoot({})],
      providers: [
        provideAnimationsAsync()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StoreItemComponent);
    component = fixture.componentInstance;
    const store: StoreDTO = {
      id: 1,
      address: {
        id: 1,
        details: "",
        number: 1,
        street: ""
      },
      phoneNumber: 1,
      schedule: {
        en: "",
        es: ""
      },
      name: "",
      image: "assets/img/default.png",
    };
    fixture.componentRef.setInput("store", store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
