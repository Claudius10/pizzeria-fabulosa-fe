import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ThemeSelectorComponent} from './theme-selector.component';
import {TranslateModule} from '@ngx-translate/core';

describe('ThemeSelectorComponent', () => {
  let component: ThemeSelectorComponent;
  let fixture: ComponentFixture<ThemeSelectorComponent>;

  beforeEach(async () => {
    const themeServiceSpy = jasmine.createSpyObj('ThemeService', ['getDarkMode', 'toggleDarkMode']);

    await TestBed.configureTestingModule({
      imports: [ThemeSelectorComponent, TranslateModule.forRoot()],
      providers: [
        {provide: 'ThemeService', useValue: themeServiceSpy},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ThemeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
