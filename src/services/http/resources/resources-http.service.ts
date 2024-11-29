import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OfferDTO, ProductDTO, StoreDTO} from '../../../interfaces/dto/resources';

@Injectable({
  providedIn: 'root'
})
export class ResourcesHttpService {
  private httpClient = inject(HttpClient);

  public findProducts(type: string) {
    return this.httpClient.get<ProductDTO[]>(`http://192.168.1.128:8080/api/resource/product?type=${type}`);
  }

  public findOffers() {
    return this.httpClient.get<OfferDTO[]>(`http://192.168.1.128:8080/api/resource/offer`);
  }

  public findStores() {
    return this.httpClient.get<StoreDTO[]>(`http://192.168.1.128:8080/api/resource/store`);
  }
}
