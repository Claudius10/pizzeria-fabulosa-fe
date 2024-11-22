import {inject, Injectable} from '@angular/core';
import {ResourcesHttpService} from './resources-http.service';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {ProductsQueryResult} from '../../../interfaces/query';
import {firstValueFrom} from 'rxjs';
import {BaseQueryOptions} from '../../../interfaces/base';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private resourcesHttpService = inject(ResourcesHttpService);

  public findProducts(options: BaseQueryOptions): ProductsQueryResult {
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
}
