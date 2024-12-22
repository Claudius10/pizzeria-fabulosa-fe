import {inject, Injectable} from '@angular/core';
import {ResourcesHttpService} from './resources-http.service';
import {injectQuery, QueryClient} from '@tanstack/angular-query-experimental';
import {firstValueFrom} from 'rxjs';
import {BaseQueryOptions, QueryResult} from '../../../interfaces/query';
import {RESOURCE_PRODUCT_BEVERAGES, RESOURCE_PRODUCT_PIZZA} from '../../../utils/query-keys';
import {ProductDTO} from '../../../interfaces/dto/resources';
import {ResponseDTO} from '../../../interfaces/http/api';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private queryClient: QueryClient = inject(QueryClient);
  private resourcesHttpService = inject(ResourcesHttpService);

  findProducts(options: BaseQueryOptions): QueryResult {
    const query = injectQuery(() => ({
      queryKey: options.queryKey,
      queryFn: () => firstValueFrom(this.resourcesHttpService.findProducts(options.queryKey[2]))
    }));

    return {
      data: query.data,
      status: query.status,
      error: query.error
    };
  }

  findOffers(options: BaseQueryOptions): QueryResult {
    const query = injectQuery(() => ({
      queryKey: options.queryKey,
      queryFn: () => firstValueFrom(this.resourcesHttpService.findOffers())
    }));

    return {
      data: query.data,
      status: query.status,
      error: query.error
    };
  }

  findAllProducts(): ProductDTO[] {
    const pizzas = this.queryClient.ensureQueryData({
      queryKey: RESOURCE_PRODUCT_PIZZA,
      queryFn: () => firstValueFrom(this.resourcesHttpService.findProducts(RESOURCE_PRODUCT_PIZZA[2]))
    });

    const beverages = this.queryClient.ensureQueryData({
      queryKey: RESOURCE_PRODUCT_BEVERAGES,
      queryFn: () => firstValueFrom(this.resourcesHttpService.findProducts(RESOURCE_PRODUCT_BEVERAGES[2]))
    });

    const products: ProductDTO[] = [];

    pizzas.then((response: ResponseDTO) => {
      const payload = response.payload as ProductDTO[];
      payload.forEach((product: ProductDTO) => {
        products.push(product);
      });
    });

    beverages.then((response: ResponseDTO) => {
      const payload = response.payload as ProductDTO[];
      payload.forEach((product: ProductDTO) => {
        products.push(product);
      });
    });

    return products;
  }

  findStores(options: BaseQueryOptions): QueryResult {
    const query = injectQuery(() => ({
      queryKey: options.queryKey,
      queryFn: () => firstValueFrom(this.resourcesHttpService.findStores())
    }));

    return {
      data: query.data,
      status: query.status,
      error: query.error
    };
  }
}
