import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingAnimationService {
  private isLoading = signal(false);

  getIsLoading() {
    return this.isLoading.asReadonly();
  }

  startLoading() {
    this.isLoading.set(true);
  }

  stopLoading() {
    this.isLoading.set(false);
  }
}
