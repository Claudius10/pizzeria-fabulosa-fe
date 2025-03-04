import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BeverageListComponent} from './beverage-list.component';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {TranslateModule} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';


describe('BeverageListComponent', () => {
  let component: BeverageListComponent;
  let fixture: ComponentFixture<BeverageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeverageListComponent, TranslateModule.forRoot()],
      providers: [
        QueryClient,
        MessageService,
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BeverageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
