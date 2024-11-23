import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {RESOURCE_PRODUCT_BEVERAGES, RESOURCE_PRODUCT_PIZZA} from '../../interfaces/query-keys';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {firstValueFrom} from 'rxjs';
import {ResourcesHttpService} from '../../services/http/resources/resources-http.service';
import {ProductsQueryResult} from '../../interfaces/query';

export const resolvePizzas: ResolveFn<ProductsQueryResult> = () => {
  const resourcesHttpService = inject(ResourcesHttpService);

  const query = injectQuery(() => ({
    queryKey: RESOURCE_PRODUCT_PIZZA,
    queryFn: () => firstValueFrom(resourcesHttpService.findProducts(RESOURCE_PRODUCT_PIZZA[2]))
  }));

  return {
    data: query.data,
    status: query.status,
    error: query.error
  };
};

export const resolveBeverages: ResolveFn<ProductsQueryResult> = () => {
  const resourcesHttpService = inject(ResourcesHttpService);

  const query = injectQuery(() => ({
    queryKey: RESOURCE_PRODUCT_BEVERAGES,
    queryFn: () => firstValueFrom(resourcesHttpService.findProducts(RESOURCE_PRODUCT_BEVERAGES[2]))
  }));

  return {
    data: query.data,
    status: query.status,
    error: query.error
  };
};
