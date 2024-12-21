import {Injectable, signal} from '@angular/core';
import {ErrorDTO} from '../../interfaces/http/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errors = signal<ErrorDTO[]>([]);

  isEmpty() {
    return this.errors().length === 0;
  }

  getErrors() {
    return this.errors.asReadonly();
  }

  addError(error: ErrorDTO) {
    this.errors.update(errors => [...errors, error]);
  }

  clear() {
    this.errors.set([]);
  }
}

function getTestError(): ErrorDTO {
  return {
    id: 1,
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
