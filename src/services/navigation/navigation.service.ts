import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private isLoading = signal(false);

  getIsLoading() {
    return this.isLoading.asReadonly();
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading.set(isLoading);
  }
}
