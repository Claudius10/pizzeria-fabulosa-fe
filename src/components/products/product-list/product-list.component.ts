import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ResourceService} from '../../../services/http/resources/resource.service';
import {ProductItemComponent} from '../product-item/product-item.component';
import {RESOURCE_PRODUCT_PIZZA} from '../../../interfaces/query-keys';

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
export class ProductListComponent {
  private resourceService = inject(ResourceService);
  protected products = this.resourceService.findProducts({queryKey: RESOURCE_PRODUCT_PIZZA});
}
