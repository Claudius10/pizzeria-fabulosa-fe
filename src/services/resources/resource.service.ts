import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductDTO} from '../../components/products/product-item/product-item.component';
import {catchError, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private httpClient = inject(HttpClient);

  public getProducts(type: string): Observable<ProductDTO[]> {
    return this.httpClient.get<ProductDTO[]>(`http://192.168.1.128:8080/api/resource/product?type=${type}`)
      .pipe(catchError((err, caught) => {
        // have to return an Observable or throw the error
        const message: string = err.error.message;
        const status: number = err.status;
        const statusText: string = err.statusText;
        const isOk: boolean = err.ok;
        throw `Http request error: ${message}. Status: ${status} Status text: ${statusText}. IsOk: ${isOk}`;
      }));
  }
}

/*
There are two ways an HTTP request can fail:

    A network or connection error can prevent the request from reaching the backend server.
    The backend can receive the request but fail to process it, and return an error response.

HttpClient captures both kinds of errors in an HttpErrorResponse which it returns through the Observable's error channel.
Network errors have a status code of 0 and an error which is an instance of ProgressEvent.
Backend errors have the failing status code returned by the backend, and the error response as the error.
 */
