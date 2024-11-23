import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit} from '@angular/core';
import {ProductItemComponent} from '../product-item/product-item.component';
import {ProductsQueryResult} from '../../../../interfaces/query';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductItemComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  private translateService = inject(TranslateService);
  private titleService = inject(Title);
  private destroyRef = inject(DestroyRef);
  query = input.required<ProductsQueryResult>();

  ngOnInit(): void {
    // subscribe to language change events
    const subscription = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {

      const title = this.titleService.getTitle();

      // figure which title needs translating
      let titleToSet;
      if (title === "Beverages" || title === "Bebidas") {
        titleToSet = "component.title.beverages";
      } else {
        titleToSet = "component.title.pizzas";
      }

      // translate title on event
      this.translateService.get(titleToSet).subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
    });

    // unsubscribe when component unmounts
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
