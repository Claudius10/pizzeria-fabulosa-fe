import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StoreItemComponent} from './store-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {Store} from '../../../api/asset';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
