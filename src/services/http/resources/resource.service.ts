import {inject, Injectable, PLATFORM_ID, signal} from '@angular/core';
import {ResourcesHttpService} from './resources-http.service';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {firstValueFrom, lastValueFrom} from 'rxjs';
import {BaseQueryOptions, QueryOnDemand, QueryResult} from '../../../interfaces/query';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private platformId = inject(PLATFORM_ID);
  private isServer = !isPlatformBrowser(this.platformId);
  private resourcesHttpService = inject(ResourcesHttpService);
  private pageNumber = signal(1);
  private pageSize = signal(3);

  findProducts(type: string): QueryResult {
    if (this.isServer) {
      return {
        data: signal(undefined),
        status: signal('pending'),
        error: signal(null),
      };
    }

    const query = injectQuery(() => ({
      queryKey: [type, this.pageNumber() - 1, this.pageSize()],
      queryFn: () => lastValueFrom(this.resourcesHttpService.findProducts(type, this.pageNumber() - 1, this.pageSize()))
    }));

    return {
      data: query.data,
      status: query.status,
      error: query.error
    };
  }

  findOffers(options: BaseQueryOptions): QueryResult {
    if (this.isServer) {
      return {
        data: signal(undefined),
        status: signal('pending'),
        error: signal(null),
      };
    }

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
    if (this.isServer) {
      return {
        data: signal(undefined),
        status: signal('pending'),
        error: signal(null),
      };
    }

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

  findStoresOnDemand(options: BaseQueryOptions): QueryOnDemand {
    const query = injectQuery(() => ({
      queryKey: options.queryKey,
      queryFn: () => firstValueFrom(this.resourcesHttpService.findStores()),
      enabled: false
    }));

    return {
      refetch: query.refetch,
      data: query.data,
      status: query.status,
      error: query.error
    };
  }

  setPageNumber = (pageNumber: number): void => {
    this.pageNumber.set(pageNumber);
  };

  setPageSize = (pageSize: number): void => {
    this.pageSize.set(pageSize);
  };

  getPageNumber() {
    return this.pageNumber.asReadonly();
  }

  getPageSize() {
    return this.pageSize.asReadonly();
  }

  resetProductListArgs() {
    this.pageNumber.set(1);
    this.pageSize.set(3);
  }
}
