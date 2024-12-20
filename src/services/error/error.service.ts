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

function getTestError(): ErrorDTO {
  return {
    logged: true,
    fatal: true,
    path: "api/v1/auth/login",
    cause: "UnknownException",
    origin: "G.E.H.unknownException",
    message: "Unknown Exception Message Unknown Exception Message Unknown Exception Message Unknown " +
      "Exception Message Unknown Exception Message Unknown Exception Message Unknown Exception Message " +
      "Unknown Exception Message Unknown Exception Message Unknown Exception Message Unknown Exception " +
      "Message Unknown Exception Message Unknown Exception Message Unknown Exception Message Unknown " +
      "Exception Message Unknown Exception Message"
  };
}
