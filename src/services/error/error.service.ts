import {Injectable, signal} from '@angular/core';
import {ErrorDTO} from '../../interfaces/http/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  error = signal<ErrorDTO | null>(null);

  getError() {
    return this.error.asReadonly();
  }

  setError(error: ErrorDTO) {
    this.error.set(error);
  }
}
