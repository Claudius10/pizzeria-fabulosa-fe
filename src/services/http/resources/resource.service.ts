import {inject, Injectable} from '@angular/core';
import {ResourcesHttpService} from './resources-http.service';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {firstValueFrom} from 'rxjs';
import {BaseQueryOptions, BaseQueryOptionsId, QueryResult} from '../../../interfaces/query';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private resourcesHttpService = inject(ResourcesHttpService);

  findAllProducts(options: BaseQueryOptions): QueryResult {
    const query = injectQuery(() => ({
      queryKey: options.queryKey,
      queryFn: () => firstValueFrom(this.resourcesHttpService.findAllProducts())
    }));

    return {
      data: query.data,
      status: query.status,
      error: query.error
    };
  }

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

  findStoreByAddressId(options: BaseQueryOptionsId) {
    const query = injectQuery(() => ({
      queryKey: options.queryKey,
      queryFn: () => firstValueFrom(this.resourcesHttpService.findStoreByAddressId(options.id))
    }));

    return {
      data: query.data,
      status: query.status,
      error: query.error
    };
  }
}
