import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseDTO} from '../../../interfaces/http/api';
import {
  BASE,
  PATH,
  RESOURCE_BASE,
  RESOURCE_OFFER,
  RESOURCE_PRODUCT,
  RESOURCE_STORE,
  V1
} from '../../../utils/api-routes';

@Injectable({
  providedIn: 'root'
})
export class ResourcesHttpService {
  private httpClient = inject(HttpClient);

  public findProducts(type: string) {
    return this.httpClient.get<ResponseDTO>(`${PATH + BASE + V1 + RESOURCE_BASE + RESOURCE_PRODUCT}?type=${type}`);
  }

  public findOffers() {
    return this.httpClient.get<ResponseDTO>(`${PATH + BASE + V1 + RESOURCE_BASE + RESOURCE_OFFER}`);
  }

  public findStores() {
    return this.httpClient.get<ResponseDTO>(`${PATH + BASE + V1 + RESOURCE_BASE + RESOURCE_STORE}`);
  }
}
