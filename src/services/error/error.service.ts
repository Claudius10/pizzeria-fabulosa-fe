import {inject, Injectable, signal} from '@angular/core';
import {ErrorDTO, ResponseDTO} from '../../interfaces/http/api';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {
  ADDRESS_MAX_SIZE,
  BAD_CREDENTIALS,
  DUMMY_ACCOUNT_ERROR,
  INVALID_TOKEN,
  ORDER_DELETE_TIME_ERROR,
  ORDER_NOT_FOUND,
  USER_EMAIL_ALREADY_EXISTS,
  USER_ID_NO_MATCH,
  USER_NOT_FOUND
} from '../../utils/api-messages';
import {AuthService} from '../auth/auth.service';
import {AUTH_BASE, AUTH_LOGOUT, BASE, V1} from '../../utils/api-routes';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private httpClient = inject(HttpClient);
  private PATH = environment.url;
  private authService = inject(AuthService);
  private translateService = inject(TranslateService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  errors = signal<ErrorDTO[]>([]);

  isEmpty() {
    return this.errors().length === 0;
  }

  getErrors() {
    return this.errors.asReadonly();
  }

  handleError(response: ResponseDTO) {
    if (response.error!.fatal) {
      this.handleFatalError(response);
    } else {
      this.handleNonFatalError(response);
    }
  }

  private addError(error: ErrorDTO) {
    this.errors.update(errors => [...errors, error]);
  }

  private handleNonFatalError(response: ResponseDTO) {
    if (response.error === null) {
      throw new Error("Expected error is NULL");
    }

    const errorDTO: ErrorDTO = response.error;
    const cause = errorDTO.cause;
    const summary = this.getErrorSummary(cause);
    const details = this.getErrorDetails(cause);

    this.messageService.add({severity: this.getSeverity(summary), summary: summary, detail: details, life: 3000});

    if (INVALID_TOKEN === cause) {
      this.logout();
    }
  }

  private handleFatalError(response: ResponseDTO) {
    if (response.error === null) {
      throw new Error("Expected error is NULL");
    }

    const errorDTO: ErrorDTO = response.error;
    this.addError(errorDTO);
    this.router.navigate(["/error"]);
  }

  private logout() {
    this.authService.logout();
    const logout = lastValueFrom(this.sendLogout());

    logout.then(response => {
      if (response && response.error) {
        this.handleError(response);
      }
    }).catch(() => this.handleServerNoResponse());

    setTimeout(() => {
      this.router.navigate(["/"]);
    }, 3000);
  }

  ensureId(ids: string[]) {
    for (let id of ids) {
      if (id === null) {
        return false;
      }
    }
    return true;
  }

  handleServerNoResponse() {
    this.messageService.add({
      severity: 'warn',
      summary: this.translateService.instant("toast.severity.warning"),
      detail: this.translateService.instant("toast.error.server.detail"),
      life: 3000
    });
  }

  clear() {
    this.errors.set([]);
  }

  getErrorSummary(cause: string): string {
    switch (cause) {
      case USER_ID_NO_MATCH:
        return this.translateService.instant("toast.severity.error");
      case USER_NOT_FOUND:
        return this.translateService.instant("toast.severity.warning");
      case BAD_CREDENTIALS:
        return this.translateService.instant("toast.severity.warning");
      case USER_EMAIL_ALREADY_EXISTS:
        return this.translateService.instant("toast.severity.warning");
      case ADDRESS_MAX_SIZE:
        return this.translateService.instant("toast.severity.warning");
      case ORDER_NOT_FOUND:
        return this.translateService.instant("toast.severity.error");
      case ORDER_DELETE_TIME_ERROR:
        return this.translateService.instant("toast.severity.warning");
      case INVALID_TOKEN:
        return this.translateService.instant("toast.severity.error");
      case DUMMY_ACCOUNT_ERROR:
        return this.translateService.instant("toast.severity.warning");
      default:
        console.log("getErrorSummary: unknown cause received from BE ", cause);
        return this.translateService.instant("toast.severity.error");
    }
  }

  getErrorDetails(cause: string): string {
    switch (cause) {
      case USER_ID_NO_MATCH:
        return this.translateService.instant("toast.error.api.user.id.no.match.detail");
      case USER_NOT_FOUND:
        return this.translateService.instant("toast.error.api.user.not.found.detail");
      case BAD_CREDENTIALS:
        return this.translateService.instant("toast.error.api.user.not.found.detail");
      case USER_EMAIL_ALREADY_EXISTS:
        return this.translateService.instant("toast.error.api.user.email.unique.detail");
      case ADDRESS_MAX_SIZE:
        return this.translateService.instant("toast.error.api.user.address.list.full.detail");
      case ORDER_NOT_FOUND:
        return this.translateService.instant("toast.error.api.user.order.not.found.detail");
      case ORDER_DELETE_TIME_ERROR:
        return this.translateService.instant("toast.error.api.user.order.cancel.not.allowed");
      case INVALID_TOKEN:
        return this.translateService.instant("toast.error.api.user.invalid.token");
      case DUMMY_ACCOUNT_ERROR:
        return this.translateService.instant("toast.error.api.user.dummy");
      default:
        console.log("getErrorDetails: unknown cause received from BE ", cause);
        return this.translateService.instant("toast.error.api.unknown");
    }
  }

  getSeverity(summary: string): string {
    switch (summary) {
      case "Información":
        return "info";
      case "Information":
        return "info";
      case "Advertencia":
        return "warn";
      case "Warning":
        return "warn";
      case "Error":
        return "error";
      default:
        return "error";
    }
  }

  private sendLogout() {
    return this.httpClient.post<ResponseDTO>(`${this.PATH + BASE + V1 + AUTH_BASE + AUTH_LOGOUT}`,
      {responseType: "text"}, // -> without this, cookies won't be set
      {withCredentials: true});
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
