import {inject, Injectable} from '@angular/core';
import {ResourcesHttpService} from './resources-http.service';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {BaseQueryOptions, ProductsQueryResult} from '../../interfaces/query';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private resourcesHttpService = inject(ResourcesHttpService);

  public findProducts(options: BaseQueryOptions) {
    const query = injectQuery(() => ({
      queryKey: options.queryKey,
      queryFn: () => firstValueFrom(this.resourcesHttpService.findProducts(options.queryKey[2]))
    }));

    const queryResult: ProductsQueryResult = {
      data: query.data,
      status: query.status,
      error: query.error
    };

    return queryResult;
  }
}
