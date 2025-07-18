import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StoreCheckoutComponent} from './store-checkout.component';
import {TranslateModule} from '@ngx-translate/core';
import {Store} from '../../../../api/public';

describe('StoreCheckoutComponent', () => {
  let component: StoreCheckoutComponent;
  let fixture: ComponentFixture<StoreCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreCheckoutComponent, TranslateModule.forRoot({})],
    })
      .compileComponents();

    fixture = TestBed.createComponent(StoreCheckoutComponent);
    component = fixture.componentInstance;

    const store: Store = {
      id: 1,
      address: "myAddress",
      phoneNumber: 1,
      schedule: {
        en: "",
        es: ""
      },
      name: "",
      image: "assets/img/default.png",
    };
    fixture.componentRef.setInput("store", store);
    fixture.componentRef.setInput("orientation", "horizontal");
    fixture.componentRef.setInput("selected", null);
    fixture.componentRef.setInput("invalid", true);
    fixture.componentRef.setInput("highlight", false);


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
