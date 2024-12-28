import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseDTO} from '../../../interfaces/http/api';
import {BASE, RESOURCE_BASE, RESOURCE_OFFER, RESOURCE_PRODUCT, RESOURCE_STORE, V1} from '../../../utils/api-routes';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourcesHttpService {
  private httpClient = inject(HttpClient);
  private PATH = environment.url;

  public findAllProducts() {
    return this.httpClient.get<ResponseDTO>(`${this.PATH + BASE + V1 + RESOURCE_BASE + RESOURCE_PRODUCT}`);
  }

  public findProducts(type: string) {
    return this.httpClient.get<ResponseDTO>(`${this.PATH + BASE + V1 + RESOURCE_BASE + RESOURCE_PRODUCT}?type=${type}`);
  }

  public findOffers() {
    return this.httpClient.get<ResponseDTO>(`${this.PATH + BASE + V1 + RESOURCE_BASE + RESOURCE_OFFER}`);
  }

  public findStores() {
    return this.httpClient.get<ResponseDTO>(`${this.PATH + BASE + V1 + RESOURCE_BASE + RESOURCE_STORE}`);
  }

  public findStoreByAddressId(id: string) {
    return this.httpClient.get<ResponseDTO>(`${this.PATH + BASE + V1 + RESOURCE_BASE + RESOURCE_STORE}/${id}`);
  }
}
