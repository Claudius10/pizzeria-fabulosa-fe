import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductDTO} from '../../components/products/product-item/product-item.component';

@Injectable({
  providedIn: 'root'
})
export class ResourcesHttpService {
  private httpClient = inject(HttpClient);

  public findProducts(type: string) {
    return this.httpClient.get<ProductDTO[]>(`http://192.168.1.128:8080/api/resource/product?type=${type}`);
  }
}
