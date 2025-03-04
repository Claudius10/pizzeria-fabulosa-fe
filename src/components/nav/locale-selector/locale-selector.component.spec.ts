import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LocaleSelectorComponent} from './locale-selector.component';
import {MessageService} from 'primeng/api';
import {TranslateModule} from '@ngx-translate/core';

describe('LocaleSelectorComponent', () => {
  let component: LocaleSelectorComponent;
  let fixture: ComponentFixture<LocaleSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocaleSelectorComponent, TranslateModule.forRoot()],
      providers: [
        MessageService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LocaleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
